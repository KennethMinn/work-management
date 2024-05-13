import { Button, Flex, Image, Stack, TextInput } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import auth from "../../assets/auth.jpg";
import { useForm } from "@mantine/form";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { height } = useViewportSize();
  const form = useForm({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length > 7 ? null : "Password must be at least 8 characters",
    },
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values);
    form.reset();
    navigate("/dashboard");
  };

  return (
    <Flex justify="center" h={height} align="center">
      <Image src={auth} h={800}></Image>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <Image style={{ cursor: "pointer" }} w={300} src={logo} />
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
          <Button type="submit" mt={12} color="#00cdfa">
            Login
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default Login;
