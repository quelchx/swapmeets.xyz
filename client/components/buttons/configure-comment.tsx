import { Box } from "@chakra-ui/react";

type ConfigureCommentProps = {
  label: string;
  color: string;
};

const ConfigureCommentButton = ({ label, color }: ConfigureCommentProps) => {
  return (
    <Box _hover={{ color: color }} cursor="pointer">
      <small>{label}</small>
    </Box>
  );
};

export default ConfigureCommentButton;
