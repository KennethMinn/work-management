import { TableColumn } from "react-data-table-component";
import { Flex } from "@mantine/core";
import { CustomerDataRow } from "../types";
import CustomerEditForm from "../components/CustomerEditForm";
import CustomerDeleteForm from "../components/CustomerDeleteForm";

export const useCustomerColumns = () => {
  const customerColumns: TableColumn<CustomerDataRow>[] = [
    {
      name: "Id",
      selector: (row) => row.id,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      width: "150px",
    },
    {
      name: "Business Type",
      selector: (row) => row.business_type,
      width: "150px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact_person,
      width: "150px",
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "200px",
    },
    {
      name: "Address",
      selector: (row) => row.address,
      width: "100px",
    },
    {
      name: "Social",
      selector: (row) => row.social_link,
      width: "160px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Flex align="center" gap={20}>
          <CustomerEditForm id={row.id} />
          <CustomerDeleteForm id={row.id} />
        </Flex>
      ),
    },
  ];

  return customerColumns;
};
