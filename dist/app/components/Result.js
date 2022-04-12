"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const Result = ({ data }) => {
    const topics = data[0][0]["i"].map((e) => {
        return e[0];
    });
    return (<react_1.Flex direction="column" justify="space-between" p="4" height="100%">
      <react_1.Box>
        <react_1.Box display="flex" justifyContent="space-between">
          <react_1.Text pb="3" color="white" size="lg" fontWeight="bold">
            Summary :
          </react_1.Text>
          {data && (<react_1.Button px={4} mt="-2" justifySelf="flex-end" rounded="xl" type="submit" variant="outline" color="#fff" _hover={{ color: "#000", backgroundColor: "#fff" }} _focus={{
                outline: "none",
            }}>
              <a href="./lda.html" target="_blank">
                Check Visualizations
              </a>
            </react_1.Button>)}
        </react_1.Box>
        <react_1.Text color="white">{data[1]}</react_1.Text>
      </react_1.Box>
      <react_1.Box alignSelf="flex-end">
        <react_1.Box my="2" pt="4">
          <span>
            <react_1.Text as="span" color="white">
              Topics :
            </react_1.Text>
          </span>
          :
          {topics.map((t) => (<react_1.Badge rounded="sm" mx="2" key={t}>
              {t}
            </react_1.Badge>))}
        </react_1.Box>
      </react_1.Box>
    </react_1.Flex>);
};
exports.default = Result;
//# sourceMappingURL=Result.js.map