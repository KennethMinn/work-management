import { Text } from "@mantine/core";
import { FC, ReactNode, Suspense } from "react";

interface LazyLoadProps {
  children: ReactNode;
}

const LazyLoad: FC<LazyLoadProps> = ({ children }) => {
  return <Suspense fallback={<Text>loading...</Text>}>{children}</Suspense>;
};

export default LazyLoad;
