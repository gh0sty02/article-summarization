import { VStack, GridItem, SkeletonText, Grid } from "@chakra-ui/react";
import React, { FC } from "react";
import { IData } from "../utils/types";

import Header from "./Header";
import Result from "./Result";
import TextForm from "./TextForm";

const MainScreen: FC<{
  getSummaryHandler: (data: IData) => void;
  data: IData | undefined;
}> = ({ getSummaryHandler, data }) => {
  return (
    <VStack w="80vw" justify="center" alignSelf="center">
      <Header />
      <Grid
        shadow="xl"
        rounded="lg"
        bg="#191b1c"
        width="100%"
        templateColumns="repeat(2, 1fr)"
      >
        <GridItem>
          <TextForm getSummary={getSummaryHandler} />
        </GridItem>
        <GridItem borderLeft="1px solid #282c2d">
          {!data && <SkeletonText p="6" mt="4" noOfLines={6} spacing="4" />}
          {data && <Result data={data} />}
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default MainScreen;
