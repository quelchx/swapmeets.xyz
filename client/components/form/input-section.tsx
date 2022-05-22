import { ReactNode } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

type InputSectionProps = {
  label: string;
  width?: string | number;
  children: ReactNode;
};

const InputSection: React.FC<InputSectionProps> = (props) => {
  return (
    <FormControl minW={props.width}>
      <FormLabel>{props.label}</FormLabel>
      {props.children}
    </FormControl>
  );
};

export default InputSection;
