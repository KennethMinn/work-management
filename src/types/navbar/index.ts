import { Dispatch, SetStateAction } from "react";

export type NavbarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
