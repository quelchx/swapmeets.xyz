import { chakra, VStack } from "@chakra-ui/react";
import React from "react";
import { FieldProps } from "../../@types";

const Field = <E extends React.ElementType = "input">({
  as,
  children,
  innerRef,
  ...others
}: FieldProps<E>) => {
  return (
    <chakra.div
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      gap={1}
    >
      {children}
      <chakra.input
        ref={innerRef}
        border="1px"
        borderColor="gray.400"
        p="7px"
        color="gray.800"
        _placeholder={{ color: "gray.400" }}
        rounded={4}
        style={{
          width: "100%",
        }}
        {...others}
      />
    </chakra.div>
  );
};

export default Field;
