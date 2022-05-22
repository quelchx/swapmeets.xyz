import { Box } from "@chakra-ui/react";

type ConfigureCommentProps = {
  label: string;
  color: string;
};

const ConfigureCommentButton: React.FC<ConfigureCommentProps> = (props) => {
  return (
    <Box _hover={{ color: props.color }} cursor="pointer">
      <small>{props.label}</small>
    </Box>
  );
};

export default ConfigureCommentButton;
