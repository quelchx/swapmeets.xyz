import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Axios from "axios";
import { useRouter } from "next/router";

import { UserModel } from "../../@types";
import { useAuthDispatch } from "../../context/auth";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: UserModel;
};

const DeleteUserModal: React.FC<DeleteModalProps> = (props) => {
  const router = useRouter();
  const dispatch = useAuthDispatch();
  const deleteUser = async () => {
    try {
      await Axios.delete("/users/" + props.user._id);
      dispatch("LOGOUT");
      router.push("/");
    } catch (err) {
      router.push("/error");
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you absolutely sure you want to delete your account?
        </ModalBody>

        <ModalFooter>
          <Button onClick={deleteUser} colorScheme="red" mr={3}>
            Delete
          </Button>
          <Button onClick={props.onClose} variant="outline">
            Exit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
