import { Box, chakra, HStack } from "@chakra-ui/react";

export type IconComponent = {
  text: string;
  icon: JSX.Element;
};
const GenericIcon: React.FC<IconComponent> = (props) => {
  const Icon = () => props.icon;
  return (
    <HStack gap={1} justify="flex-start" alignItems={"center"} width="100%">
      <Box pt={0.5}>
        <Icon />
      </Box>
      <Box>
        <chakra.p fontFamily={"monospace"} fontSize={10} pt={0.5}>
          {props.text}
        </chakra.p>
      </Box>
    </HStack>
  );
};

export default GenericIcon;
