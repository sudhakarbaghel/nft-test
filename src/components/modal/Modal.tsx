import React from "react";
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

interface StatusModalProps {
  type: "success" | "error"; 
  message: string; 
  isOpen: boolean; 
  onClose: () => void; 
}

const StatusModal: React.FC<StatusModalProps> = ({ type, message, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type === "success" ? "Success" : "Error"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={type === "success" ? "green" : "red"} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StatusModal;
