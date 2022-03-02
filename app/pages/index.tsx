import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";

import { useState } from "react";
import MainScreen from "../components/MainScreen";
import { IData } from "../utils/types";

const Home: NextPage = () => {
  const [data, setData] = useState<IData>();

  const getSummaryHandler = (data: IData) => {
    setData(data);
  };
  return (
    <Flex minH="100vh" direction="column" align="center" bg="#222526">
      <MainScreen getSummaryHandler={getSummaryHandler} data={data} />
    </Flex>
  );
};

export default Home;
