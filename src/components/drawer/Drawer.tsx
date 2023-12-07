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
  Flex,
  useToast,
  VStack,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { MdDone } from "react-icons/md";
import React, { useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { textDb } from "../../firebase";

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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | string>(0);
  const [endTime, setEndTime] = useState<number | string>(0);

  const handleImageClick = (img: string) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(
        selectedImages.filter((selectedImg) => selectedImg !== img)
      );
    } else {
      if (selectedImages.length < 2) {
        setSelectedImages([...selectedImages, img]);
      } else {
        setSelectedImages([selectedImages[1], img]);
      }
    }
  };

  const handleSubmitImages = async () => {
    setIsLoading(true);
    try {
      const valRef = collection(textDb, "analyticsData");

      const dataToStore = {
        id: selector.id,
        title: selector.title,
        description: selector.description,
        images: selectedImages,
        type: selector.type,
        analytics: true,
      };

      await addDoc(valRef, dataToStore);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    toast({
      title: `successfully uploaded files`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSubmitVideo = async () => {
    const videoDuration = videoRef.current?.duration;
    if (Number(endTime) < Number(startTime)) {
      toast({
        title: `end time should not be lessthen start time`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (Number(startTime) > Number(endTime)) {
      toast({
        title: `start time should not be greater the end time`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (
      Number(startTime) > Number(videoDuration) ||
      Number(endTime) > Number(videoDuration)
    ) {
      toast({
        title: `start time and end time should not be greater the video duration.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const valRef = collection(textDb, "analyticsData");

      const dataToStore = {
        id: selector.id,
        title: selector.title,
        description: selector.description,
        images: selector.images,
        type: selector.type,
        analytics: true,
        startTime: startTime,
        endTime: endTime,
      };

      await addDoc(valRef, dataToStore);
    } catch (error) {
      toast({
        title: `${error}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    toast({
      title: `successfully uploaded files`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
              <Text>
                Note* :{" "}
                {selector.type.includes("images")
                  ? "Select any 2 images to test"
                  : selector.type.includes("images")
                  ? "Enter Start and end time"
                  : ""}
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
                  style={{ cursor: "pointer" }}
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
                      ref={videoRef}
                      style={{
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <source src={img} />
                    </video>
                  )}
                </Box>
              ))}
            </SimpleGrid>
            {selector.type.includes("video") && (
              <VStack mt="20px">
                <FormControl w={["60%", "40%", "30%"]}>
                  <FormLabel>Enter Start Time</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter Start Time In Seconds"
                    mt="10px"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <FormLabel mt="10px">Enter End Time</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter End Time In Seconds"
                    mt="10px"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </FormControl>
              </VStack>
            )}
            <Flex justify="center">
              <Button
                mt="10px"
                w="50%"
                onClick={
                  selector.type.includes("images")
                    ? handleSubmitImages
                    : handleSubmitVideo
                }
              >
                Submit Test
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
