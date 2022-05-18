import { Box, chakra, HStack } from "@chakra-ui/react";
import { IconComponent } from "../../@types";

const GenericIcon = ({ icon, text }: IconComponent) => {
  const Icon = () => icon;
  return (
    <HStack gap={1} justify="flex-start" alignItems={"center"} width="100%">
      <Box pt={0.5}>
        <Icon />
      </Box>
      <Box>
        <chakra.p fontFamily={"monospace"} fontSize={10} pt={0.5}>
          {text}
        </chakra.p>
      </Box>
    </HStack>
  );
};

export default GenericIcon;
