"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const MainScreen_1 = __importDefault(require("../components/MainScreen"));
const Home = () => {
    const [data, setData] = (0, react_2.useState)();
    const getSummaryHandler = (data) => {
        setData(data);
    };
    return (<react_1.Flex minH="100vh" direction="column" align="center" bg="#222526">
      <MainScreen_1.default getSummaryHandler={getSummaryHandler} data={data}/>
    </react_1.Flex>);
};
exports.default = Home;
//# sourceMappingURL=index.js.map