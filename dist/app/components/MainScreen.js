"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const Header_1 = __importDefault(require("./Header"));
const Result_1 = __importDefault(require("./Result"));
const TextForm_1 = __importDefault(require("./TextForm"));
const MainScreen = ({ getSummaryHandler, data }) => {
    return (<react_1.VStack w="80vw" justify="center" alignSelf="center">
      <Header_1.default />
      <react_1.Grid shadow="xl" rounded="lg" bg="#191b1c" width="100%" templateColumns="repeat(2, 1fr)">
        <react_1.GridItem>
          <TextForm_1.default getSummary={getSummaryHandler}/>
        </react_1.GridItem>
        <react_1.GridItem borderLeft="1px solid #282c2d">
          {!data && <react_1.SkeletonText p="6" mt="4" noOfLines={6} spacing="4"/>}
          {data && <Result_1.default data={data}/>}
        </react_1.GridItem>
      </react_1.Grid>
    </react_1.VStack>);
};
exports.default = MainScreen;
//# sourceMappingURL=MainScreen.js.map