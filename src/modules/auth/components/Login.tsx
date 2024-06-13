import { Button, Flex, Image, Stack, TextInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import auth from "../../../assets/auth.jpg";
import { useForm } from "@mantine/form";
import logo from "../../../assets/logo.png";
import { useLogin } from "../hooks/useLogin";
import { LoginValues } from "../types";

const Login = () => {
  const { height } = useViewportSize();
  const { mutate: login, isPending } = useLogin();
  const form = useForm({
    initialValues: {
      email: "admin123@gmail.com",
      password: "Admin123@",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 7 ? null : "Password must be at least 8 characters",
    },
  });

  const onSubmit = (values: LoginValues) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    login(formData);
    form.reset();
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
          <TextInput
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
