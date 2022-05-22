import React from "react";
import {
  Alert,
  HStack,
  AlertIcon,
  AlertTitle,
  Flex,
  AlertDescription,
  Box,
  CloseButton,
  Stack,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  error: string;
  handleClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props) => {
  return (
    <Alert justifyContent="space-between" status="error">
      <HStack spacing={-2}>
        <AlertIcon />
        <AlertTitle pl={2}>Error</AlertTitle>
        <AlertDescription
          fontSize={{ base: 12, md: 16 }}
          px={{ base: 5, md: 10 }}
        >
          {props.error}
        </AlertDescription>
      </HStack>
      <Box ml={1}>
        <CloseButton onClick={props.handleClose} />
      </Box>
    </Alert>
  );
};

export default ErrorAlert;
