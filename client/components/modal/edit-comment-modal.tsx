import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import React, { FormEvent, useRef } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import convertDate from "../../helpers/convert-date";
import { useAuthState } from "../../context/auth";
import { PostModel } from "../../@types";

interface EditCommentModalProps {
  post: PostModel;
  comment: {
    _id: string;
    body: string;
    created?: Date | string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const EditCommentModal: React.FC<EditCommentModalProps> = (props) => {
  const message = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const router = useRouter();
  const { user } = useAuthState();
  const editComment = async (event: FormEvent) => {
    event.preventDefault();
    if (message.current.value === "") return;
    try {
      await Axios.put(`/posts/comment/update/${props.post._id}`, {
        id: props.comment._id,
        body: message.current.value,
        author: user._id,
      });
      router.reload();
    } catch (err) {
      router.push("/error");
    }
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <form onSubmit={editComment}>
          <ModalContent>
            <ModalHeader>
              Posted {convertDate(props.comment.created)}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Textarea
                  ref={message}
                  placeholder={props.comment.body}
                  minHeight="180px"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditCommentModal;
