import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Text,
  Heading
} from "@chakra-ui/react";

import React, { useRef } from "react";

interface dataBase{
  id:string
  selector:any
  isLoading:boolean
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerComponent:React.FC<dataBase> = ({id,selector,isLoading,setIsLoading}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  console.log('selector',selector)
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mt='10px'>
        Test This Block
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box textAlign='center' mt='40px'>
                <Heading as="h3" size="lg">Title : {selector.title}</Heading>
                <Text mt='10px'>Description : {selector.description}</Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
