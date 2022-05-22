import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface FieldProps {
  htmlFor: string;
  label: string;
  helper?: boolean;
  helperText?: string;
  children: ReactNode;
}

const Field: FC<FieldProps> = (props) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.htmlFor}>{props.label}</FormLabel>
      {props.children}
      <>{props.helper && <FormHelperText>{props.helperText}</FormHelperText>}</>
    </FormControl>
  );
};

export default Field;
