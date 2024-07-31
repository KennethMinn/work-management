import {
  Button,
  Flex,
  Image,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import auth from "../../../assets/auth.jpg";
import { useForm } from "@mantine/form";
import logo from "../../../assets/logo.png";
import { useLogin } from "../hooks/useLogin";
import { LoginValues } from "../types";
import toast from "react-hot-toast";

const Login = () => {
  const { height } = useViewportSize();
  const { mutate: login, isPending } = useLogin();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 7 ? null : "Password must be at least 8 characters",
    },
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    login(formData, {
      onSuccess: () => {
        form.reset();
      },
      onError: () => {
        toast.error("Invalid credentials");
      },
    });
  };

  return (
    <Flex justify="center" h={height} align="center">
      <Image src={auth} h={690} />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <Image
            style={{ userSelect: "none", pointerEvents: "none" }}
            w={300}
            src={logo}
          />
          <TextInput
            w={400}
            label="Email"
            placeholder="Enter Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            w={400}
            label="Password"
            placeholder="Enter Password"
            {...form.getInputProps("password")}
          />
          <Button
            loading={isPending}
            disabled={isPending}
            type="submit"
            mt={12}
            color="#00cdfa"
          >
            Login
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
