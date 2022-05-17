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

const EditCommentModal = ({ post, comment, isOpen, onOpen, onClose }: any) => {
  const message = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const router = useRouter();
  const { user } = useAuthState();
  const editComment = async (event: FormEvent) => {
    event.preventDefault();
    if (message.current.value === "") return;
    try {
      await Axios.put(`/posts/comment/update/${post._id}`, {
        id: comment._id,
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={editComment}>
          <ModalContent>
            <ModalHeader>Posted {convertDate(comment.created)}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Textarea
                  ref={message}
                  placeholder={comment.body}
                  minHeight="180px"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditCommentModal;
