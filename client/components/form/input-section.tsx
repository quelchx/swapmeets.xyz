import { ReactNode } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

type InputSectionProps = {
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
