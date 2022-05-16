import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface InputSectionProps {
  label: string;
  width?: string | number;
  children: ReactNode;
}

const InputSection = ({ label, children, width }: InputSectionProps) => {
  return (
    <FormControl minW={width}>
      <FormLabel>{label}</FormLabel>
      {children}
    </FormControl>
  );
};

export default InputSection;
