import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const ToggleTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button bg={"inherit"} onClick={toggleColorMode}>
      {colorMode === "light" ? (
        <MoonIcon color={"orange.300"} />
      ) : (
        <SunIcon color={"orange.300"} />
      )}
    </Button>
  );
};

export default ToggleTheme;
