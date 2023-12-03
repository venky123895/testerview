import React from "react";
import { Card, Text, Heading, Image, AspectRatio } from "@chakra-ui/react";
import DrawerComponent from "../drawer/Drawer";

interface DatabaseCard {
  selector: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataBaseCard: React.FC<DatabaseCard> = ({
  selector,
  isLoading,
  setIsLoading,
}) => {

console.log(selector?.images[0])
  return (
    <>
      <Card p="10px">
        {selector.type === "images" ? (
          <Image
            objectFit="cover"
            src={selector?.images[0]}
            alt="Chakra UI"
            height="100px"
            borderRadius="10px"
          />
        ) : (
          <>
            <AspectRatio w="100%" h="100px">
              <video controls>
                <source src={selector?.images[0]} />
              </video>
            </AspectRatio>
          </>
        )}
        <Heading size="sm" mt="10px">
          {selector?.title}
        </Heading>
        <Text pt="5px">{selector?.description}</Text>
        <DrawerComponent id={selector.id} selector={selector} isLoading={isLoading} setIsLoading={setIsLoading} />
      </Card>
    </>
  );
};

export default DataBaseCard;
