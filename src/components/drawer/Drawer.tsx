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
  Heading,
  SimpleGrid,
  Image,
  Icon,
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md"; 
import React, { useRef, useState } from "react";

interface dataBase {
  id: string;
  selector: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerComponent: React.FC<dataBase> = ({
  id,
  selector,
  isLoading,
  setIsLoading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageClick = (img: string) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(selectedImages.filter((selectedImg) => selectedImg !== img));
    } else {
      if (selectedImages.length < 2) {
        setSelectedImages([...selectedImages, img]);
      } else {
        setSelectedImages([selectedImages[1], img]);
      }
    }
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mt="10px">
        Test This Block
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box textAlign="center" mt="40px">
              <Heading as="h3" size="lg">
                <Box as="span" color="red">
                  Title
                </Box>{" "}
                : {selector.title}
              </Heading>
              <Text mt="10px">
                <Box as="span" color="red" fontWeight="bold">
                  Description
                </Box>{" "}
                : {selector.description}
              </Text>
            </Box>
            <SimpleGrid columns={3} spacing={4} mt="25px">
              {selector?.images?.map((img: string, index: number) => (
                <Box
                  key={index}
                  position="relative"
                  overflow="hidden"
                  borderRadius="10px"
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: 'pointer' }}
                >
                  {selector.type.includes("image") ? (
                    <>
                      <Image
                        src={img}
                        h="150px"
                        w="100%"
                        alt="singleImage"
                        objectFit="cover"
                      />
                      {selectedImages.includes(img) && (
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          bottom="0"
                          background="rgba(0, 0, 0, 0.5)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon color="white" boxSize={6} as={MdDone} />
                        </Box>
                      )}
                    </>
                  ) : (
                    <video
                      controls
                      style={{
                        borderRadius: "10px",
                        marginTop: "10px",
                        width: "100%",
                      }}
                    >
                      <source src={img} />
                    </video>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
