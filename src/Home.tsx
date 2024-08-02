import { Box, Button, Flex, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { height } = useViewportSize();
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      gap={10}
      h={height}
      align="center"
      justify="center"
    >
      <Box>
        <Text fw={600}>
          Owned by K-win technologies, Developed by @Kenneth & @Kaung Htet
        </Text>
      </Box>
      <Button onClick={() => navigate("/login")}>Login</Button>
    </Flex>
  );
};

export default Home;
