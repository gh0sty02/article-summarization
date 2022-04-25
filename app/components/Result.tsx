import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IData } from "../utils/types";

const Result: FC<{ data: IData }> = ({ data }) => {
  // const topics = data[0][0]["i"].map((e) => {
  //   return e[0];
  // }) as string[];
  const entities = data[1];

  return (
    <Flex direction="column" justify="space-between" p="4" height="100%">
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Text pb="3" color="white" size="lg" fontWeight="bold">
            Summary :
          </Text>
          {data && (
            <Button
              px={4}
              mt="-2"
              justifySelf="flex-end"
              rounded="xl"
              type="submit"
              variant="outline"
              color="#fff"
              _hover={{ color: "#000", backgroundColor: "#fff" }}
              _focus={{
                outline: "none",
              }}
            >
              <a href="./lda.html" target="_blank">
                Check Visualizations
              </a>
            </Button>
          )}
        </Box>
        <Text color="white">{data[0]}</Text>
      </Box>
      <Box alignSelf="flex-start">
        <Box my="2" pt="4">
          <span>
            <Text as="span" color="white">
              Entites :
            </Text>
          </span>
          :
          {entities.map((t) => (
            <Badge rounded="sm" mx="2" key={t}>
              {t}
            </Badge>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default Result;
