import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Customer, Item, Project, Task, TTaskFormSchema } from "../../types";
import React, { FC, useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  FileButton,
  Flex,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconCloudUpload, IconPlus, IconTrash } from "@tabler/icons-react";
import {
  ShootingAccessoriesDataRow,
  ShootingCategory,
} from "../../../shooting-accessories/types";
import { Employee } from "../../../project/types";
import { useOfficeTime } from "../../hooks/time/useOfficeTime";
import { useInTime } from "../../hooks/time/useInTime";
import { useOutTime } from "../../hooks/time/useOutTime";
import { useGetAllShootingCategories } from "../../../shooting-category/hooks/useGetAllShootingCategories";
import useGetShootingAccessoriesByCategoryId from "../../../shooting-accessories/hooks/useGetShootingAccessoriesByCategoryId";

interface ShootingFormProps {
  assignedTask?: Task;
  handleRequiredQtyChange?: (id: number, value: number) => void;
  errors: FieldErrors<TTaskFormSchema>;
  register: UseFormRegister<TTaskFormSchema>;
  control: Control<TTaskFormSchema>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  resetRef: React.RefObject<() => void>;
  clearFile: () => void;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  customers: Customer[];
  projects: Project[];
  employees: Employee[];
}

const ShootingForm: FC<ShootingFormProps> = ({
  errors,
  register,
  control,
  file,
  setFile,
  resetRef,
  clearFile,
  items,
  setItems,
  customers,
  projects,
  employees,
  assignedTask,
  handleRequiredQtyChange,
}) => {
  const { refOfficeTime, pickerControlOfficeTime } = useOfficeTime();
  const { refInTime, pickerControlInTime } = useInTime();
  const { refOutTime, pickerControlOutTime } = useOutTime();

  const [qty, setQty] = useState(0);
  const [shootingCategory, setShootingCategory] = useState<string | null>(null);
  const [shootingAccessory, setShootingAccessory] = useState<string | null>(
    null
  );
  const { data: shootingCategories } = useGetAllShootingCategories("visible");
  const { data: shootingAccessories } = useGetShootingAccessoriesByCategoryId(
    shootingCategory!
  );

  const onAddAccessories = () => {
    if (!shootingCategory || !shootingAccessory || !qty) {
      return;
    }
    const newItem = {
      id: Date.now(),
      accessory_name: shootingAccessory,
      required_qty: qty,
      taken_qty: 0,
      returned_qty: 0,
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    setShootingCategory(null);
    setShootingAccessory(null);
  };

  useEffect(() => {
    setShootingAccessory(null);
  }, [shootingCategory]);

  return (
    <React.Fragment>
      <TextInput
        label="Duration"
        style={{ width: "100%" }}
        placeholder="Enter duration"
        {...register("duration")}
        error={errors.duration?.message}
      />
      <TextInput
        label="Shooting location"
        style={{ width: "100%" }}
        placeholder="Enter shooting location"
        {...register("shooting_location")}
        error={errors.shooting_location?.message}
      />
      <Flex align="center" gap="lg">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select
              label="Type"
              style={{ width: "50%" }}
              placeholder="Pick type"
              data={["type"]}
              {...field}
              error={errors.type?.message}
            />
          )}
        />
        <TextInput
          label="Transportation charge"
          style={{ width: "50%" }}
          placeholder="Enter transportation"
          {...register("transportation_charge")}
          error={errors.transportation_charge?.message}
        />
      </Flex>
      <Textarea
        style={{ width: "100%" }}
        placeholder="Type detail..."
        {...register("type_detail")}
        error={errors.type_detail?.message}
      />
      <Textarea
        style={{ width: "100%" }}
        placeholder="Script detail..."
        {...register("script_detail")}
        error={errors.script_detail?.message}
      />
      <Flex align="center" gap="lg">
        <TextInput
          style={{ width: "50%" }}
          placeholder="Number of scene"
          {...register("scene_number")}
          error={errors.scene_number?.message}
        />
        {file ? (
          <Flex align="center" gap="lg" style={{ width: "50%" }}>
            <Text>{file.name}</Text>
            <ActionIcon
              size="lg"
              variant="filled"
              color="red"
              onClick={clearFile}
            >
              <IconTrash size={20} />
            </ActionIcon>
          </Flex>
        ) : (
          <Group style={{ width: "50%" }}>
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="application/pdf"
            >
              {(props) => (
                <Button leftSection={<IconCloudUpload />} {...props}>
                  Upload Document
                </Button>
              )}
            </FileButton>
            <Button disabled={!file} color="red" onClick={clearFile}>
              Reset
            </Button>
          </Group>
        )}
      </Flex>
      <Flex align="center" gap="lg">
        <TextInput
          style={{ width: "50%" }}
          placeholder="Contat person name"
          {...register("contact_name")}
          error={errors.contact_name?.message}
        />
        <TextInput
          style={{ width: "50%" }}
          placeholder="Contat person phone"
          {...register("contact_phone")}
          error={errors.contact_phone?.message}
        />
      </Flex>
      <Controller
        name="crew_list"
        control={control}
        render={({ field }) => (
          <MultiSelect
            hidePickedOptions
            label="Crew list"
            style={{ width: "100%" }}
            placeholder="Pick crews"
            data={employees?.map((employee: Employee) => ({
              label: employee.name,
              value: employee.name,
            }))}
            {...field}
            error={errors.crew_list?.message}
          />
        )}
      />
      <Flex align="center" gap="lg">
        <Controller
          name="photo_shooting_project"
          control={control}
          render={({ field }) => (
            <Select
              label="Photo shooting project"
              style={{ width: "50%" }}
              placeholder="Pick project"
              data={projects?.map((project: Project) => ({
                label: project.name,
                value: project.name,
              }))}
              {...field}
              error={errors.photo_shooting_project?.message}
            />
          )}
        />
        <Controller
          name="video_shooting_project"
          control={control}
          render={({ field }) => (
            <Select
              label="Video shooting project"
              style={{ width: "50%" }}
              placeholder="Pick project"
              data={projects?.map((project: Project) => ({
                label: project.name,
                value: project.name,
              }))}
              {...field}
              error={errors.video_shooting_project?.message}
            />
          )}
        />
      </Flex>
      <Flex align="center" gap="lg">
        <Controller
          name="arrive_office_on_time"
          control={control}
          render={({ field }) => (
            <TimeInput
              {...field}
              label="Arrive office time"
              error={errors.arrive_office_on_time?.message}
              style={{ width: "50%" }}
              value={field.value || ""} // Ensure value is defined
              onChange={(time) => field.onChange(time)}
              ref={refOfficeTime}
              rightSection={pickerControlOfficeTime}
            />
          )}
        />
        <Controller
          name="client"
          control={control}
          render={({ field }) => (
            <Select
              label="Client"
              style={{ width: "50%" }}
              placeholder="Pick client"
              data={customers?.map((customer: Customer) => ({
                label: customer.name,
                value: customer.name,
              }))}
              {...field}
              error={errors.client?.message}
            />
          )}
        />
      </Flex>
      <Flex align="center" gap="lg">
        <Controller
          name="in_time"
          control={control}
          render={({ field }) => (
            <TimeInput
              {...field}
              label="In time"
              error={errors.in_time?.message}
              style={{ width: "50%" }}
              value={field.value || ""} // Ensure value is defined
              onChange={(time) => field.onChange(time)}
              ref={refInTime}
              rightSection={pickerControlInTime}
            />
          )}
        />
        <Controller
          name="out_time"
          control={control}
          render={({ field }) => (
            <TimeInput
              {...field}
              label="Out time"
              error={errors.out_time?.message}
              style={{ width: "50%" }}
              value={field.value || ""} // Ensure value is defined
              onChange={(time) => field.onChange(time)}
              ref={refOutTime}
              rightSection={pickerControlOutTime}
            />
          )}
        />
      </Flex>
      <Textarea
        {...register("project_details")}
        style={{ width: "100%" }}
        label="Project details"
        placeholder="Enter project details"
        error={errors.project_details?.message}
      />
      <Grid>
        <Grid.Col span={3.3}>
          <Select
            value={shootingCategory}
            onChange={setShootingCategory}
            label="Shooting category"
            style={{ width: "100%" }}
            placeholder="Pick category"
            data={shootingCategories?.map(
              (shootingCategory: ShootingCategory) => ({
                label: shootingCategory.name,
                value: shootingCategory.id.toString(),
              })
            )}
            error={errors.photo_shooting_project?.message}
          />
        </Grid.Col>
        <Grid.Col span={3.3}>
          <Select
            label="Shooting accessory"
            style={{ width: "100%" }}
            disabled={!shootingCategory}
            value={shootingAccessory}
            onChange={setShootingAccessory}
            placeholder="Pick accessory"
            data={shootingAccessories?.map(
              (shootingAccessory: ShootingAccessoriesDataRow) => ({
                label: shootingAccessory.name,
                value: shootingAccessory.name,
              })
            )}
            error={errors.photo_shooting_project?.message}
          />
        </Grid.Col>
        <Grid.Col span={3.3}>
          <NumberInput
            value={qty}
            onChange={(qty) => setQty(Number(qty))}
            label="Required quantity"
            style={{ width: "100%" }}
            placeholder="Enter task title"
            error={errors.title?.message}
          />
        </Grid.Col>
        <Grid.Col span={1} mt={25}>
          <Button
            onClick={onAddAccessories}
            leftSection={<IconPlus size={20} />}
          >
            Add
          </Button>
        </Grid.Col>
      </Grid>
      {assignedTask
        ? items?.length > 0 && (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No</Table.Th>
                  <Table.Th>Accessory Name</Table.Th>
                  <Table.Th>Required Quantity</Table.Th>
                  <Table.Th>Taken Quantity</Table.Th>
                  <Table.Th>Returned Quantity</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map((item, i) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{item.accessory_name}</Table.Td>
                    <Table.Td>
                      <NumberInput
                        disabled={assignedTask.is_reported}
                        value={item.required_qty}
                        onChange={(value) =>
                          handleRequiredQtyChange &&
                          handleRequiredQtyChange(item.id, Number(value))
                        }
                        min={0}
                      />
                    </Table.Td>
                    <Table.Td>{item.taken_qty}</Table.Td>
                    <Table.Td>{item.returned_qty}</Table.Td>
                    <Table.Td>
                      <IconTrash
                        onClick={() =>
                          setItems((prevItems) =>
                            prevItems.filter(
                              (prevItem) => prevItem.id !== item.id
                            )
                          )
                        }
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )
        : items.length > 0 && (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No</Table.Th>
                  <Table.Th>Accessory Name</Table.Th>
                  <Table.Th>Required Quantity</Table.Th>
                  <Table.Th>Taken Quantity</Table.Th>
                  <Table.Th>Returned Quantity</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map((item, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>{++i}</Table.Td>
                    <Table.Td>{item.accessory_name}</Table.Td>
                    <Table.Td>{item.required_qty}</Table.Td>
                    <Table.Td>{item.taken_qty}</Table.Td>
                    <Table.Td>{item.returned_qty}</Table.Td>
                    <Table.Td>
                      <IconTrash
                        onClick={() =>
                          setItems((prevItems) =>
                            prevItems.filter(
                              (prevItem) => prevItem.id !== item.id
                            )
                          )
                        }
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
    </React.Fragment>
  );
};

export default ShootingForm;
