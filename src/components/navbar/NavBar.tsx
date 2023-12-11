import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { GrTestDesktop } from "react-icons/gr";
import React,{useEffect} from "react";

export default function Nav() {
  useEffect(()=>{
    localStorage.setItem('chakra-ui-color-mode','dark')
  },[])
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            fontWeight="bolder"
            gap="10px"
            fontSize="20px"
            fontFamily="cursive"
          >
            Tester{" "}
            <Flex as="span" alignItems="center" gap="10px" color="red">
              {" "}
              View <GrTestDesktop />
            </Flex>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
