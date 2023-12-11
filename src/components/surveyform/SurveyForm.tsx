import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Button,
  useToast,
  Box
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { textDb } from "../../firebase";

interface SurveyFormType {
  selector: any;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyForm: React.FC<SurveyFormType> = ({ selector, setIsLoading }) => {
  
  const toast = useToast();
  const [answers, setAnswers] = useState<Array<string | undefined>>(
    Array(selector?.questions.length)
  );

  const handleTextAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleRadioAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const submitTest = async () => {
    if (answers.includes(undefined)) {
      toast({
        title: `please answer all the questions`,
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
        questions: selector.questions,
        answers: answers,
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

  return (
    <Box>
      <FormControl>
        {selector?.questions?.map((que: any, index: number) => {
          if (que.type === "descriptive") {
            return (
              <div key={index}>
                <FormLabel mt="5px">
                  {index + 1} {"."} {que.text?.charAt(0).toUpperCase()+que.text?.slice(1)} {"?"}
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Answer"
                  onChange={(e) =>
                    handleTextAnswerChange(index, e.target.value)
                  }
                />
              </div>
            );
          } else {
            return (
              <div key={index}>
                <FormLabel mt="5px">
                  {index + 1} {"."} {que.text?.charAt(0).toUpperCase()+que.text?.slice(1)} {"?"}
                </FormLabel>
                <RadioGroup
                  onChange={(value) => handleRadioAnswerChange(index, value)}
                >
                  <Stack direction="row">
                    {que.options.map((opt: any, optionIndex: number) => {
                      return (
                        <Radio
                          colorScheme="green"
                          key={optionIndex}
                          value={opt}
                        >
                          {opt?.charAt(0).toUpperCase()+opt?.slice(1)}
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </div>
            );
          }
        })}
      </FormControl>
      <Flex justify="center">
        <Button mt="10px" w="50%" onClick={submitTest}>
          Submit Test
        </Button>
      </Flex>
    </Box>
  );
};

export default SurveyForm;
