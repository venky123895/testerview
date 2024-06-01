import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { textDb } from "../../firebase";
import SurveyCard from "../cards/SurveyCard";
import DataBaseCard from "../cards/DataBaseCard";
import SkeletonComp from "../../common/skeleton/SkeletonComp";


interface home {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<home> = ({ isLoading, setIsLoading }) => {
  const [dropdown, setDropDown] = useState<string>("images");

  const [databaseData, setDatabaseData] = useState<any[]>([]);

  const getDataFromDatabase = async () => {
    try {
      setIsLoading(true);
      const valRef = collection(textDb, "textData");
      const dataDB = await getDocs(valRef);
      const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
      setDatabaseData(allData);
      console.log("database", databaseData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataFromDatabase();
  }, []);

  const filterTasks = databaseData.filter((task) => {
    return (
      dropdown.toLowerCase() === task.type.toLowerCase() &&
      dropdown.toLowerCase() !== "surveys"
    );
  });

  const surveySelector = databaseData.filter((survey) => {
    return (
      dropdown.toLowerCase() === survey.type.toLowerCase() &&
      dropdown.toLowerCase() === "surveys"
    );
  });

  return (
    <Box p="20px">
      <Select
        placeholder="Select option"
        w={["50%", "40%", "30%"]}
        onChange={(e) => setDropDown(e.target.value)}
      >
        <option value="images">Images</option>
        <option value="videos">Videos</option>
        <option value="surveys">Survey</option>
      </Select>
      {isLoading && (
        <SimpleGrid
        spacing={4}
        mt="15px"
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        maxH="400px"
        overflowY="auto"
      >
        {Array(20).fill(0).map((_,index:number)=>{
          return(
            <SkeletonComp key={index}/>
          )
        })}
        </SimpleGrid>
      )}
      {dropdown === "surveys" ? (
        <>
          {surveySelector.length > 0 ? (
            <SimpleGrid
              spacing={4}
              mt="15px"
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              maxH="400px"
              overflowY="auto"
            >
              {surveySelector.map((survey: any) => (
                <SurveyCard
                  key={survey.id}
                  selector={survey}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ))}
            </SimpleGrid>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {filterTasks.length > 0 ? (
            <SimpleGrid
              spacing={4}
              mt="15px"
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              maxH="600px"
              overflowY="auto"
            >
              {filterTasks.map((prod: any) => (
                <DataBaseCard
                  selector={prod}
                  key={prod.id}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              ))}
            </SimpleGrid>
          ) : (
            <></>
          )}
        </>
      )}
    </Box>
  );
};

export default Home;
