import { Card, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";
import img from "../assets/img.jpg";
import DrawerComponent from "../drawer/Drawer";

interface survey {
  selector: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyCard: React.FC<survey> = ({
  selector,
  isLoading,
  setIsLoading,
}) => {
  return (
    <Card p="10px">
      <Image
        objectFit="cover"
        src={img}
        alt="Chakra UI"
        height="100px"
        borderRadius="10px"
      />
      <Heading size="sm" mt="10px">
        {selector?.title}
      </Heading>
      <Text pt="5px">{selector?.description}</Text>
      <DrawerComponent id={selector.id} selector={selector} isLoading={isLoading} setIsLoading={setIsLoading}/>
    </Card>
  );
};

export default SurveyCard;
