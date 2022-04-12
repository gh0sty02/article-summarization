"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = require("@chakra-ui/react");
const react_loader_spinner_1 = require("react-loader-spinner");
const ai_1 = require("react-icons/ai");
const request_1 = require("../utils/request");
const TextForm = ({ getSummary }) => {
    const [text, setText] = (0, react_1.useState)("");
    const [data, setData] = (0, react_1.useState)();
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [wordsCount, setWordsCount] = (0, react_1.useState)(0);
    const [fileName, setFileName] = (0, react_1.useState)("");
    const inputFileRef = (0, react_1.useRef)(null);
    const txtWordCount = (text) => {
        return text.split(" ").length;
    };
    if (!loading && data) {
        getSummary(data);
    }
    const submitHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        if (text) {
            yield (0, request_1.makeRequest)(text).then((data) => {
                setData(data);
                setLoading(false);
            });
        }
    });
    const pickFileHandler = () => {
        var _a;
        (_a = inputFileRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    const pickedHandler = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const txtData = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            setText(txtData);
            setWordsCount(txtWordCount(txtData));
        };
        if (e.files) {
            reader.readAsText(e.files[0]);
            setFileName(e.files[0].name);
        }
    };
    return (<react_2.Flex direction="column">
      <form onSubmit={submitHandler}>
        {fileName && (<react_2.Box textAlign="center" pt="2" pb="2" mb="-2" as="p" fontSize="sm" fontWeight="medium" color="#fff">
            {fileName}
          </react_2.Box>)}
        <react_2.Textarea cols={50} border="none" rows={22} resize="none" required pt={2} color="white" _focus={{
            _placeholder: {
                color: "transparent",
            },
        }} placeholder="Paste or write about your topic, then click the Summarize button." _placeholder={{
            paddingLeft: "2rem",
            color: "#fff",
            fontSize: "md",
        }} value={text} onChange={(e) => setText(e.target.value)}/>
        <react_2.Input type="file" display="none" accept=".txt" ref={inputFileRef} onChange={(e) => pickedHandler(e.target)} onClick={pickFileHandler}/>

        <react_2.Flex px={4} justify="space-between" align="center" pb={2} direction="row">
          <react_2.Button display="flex" justifyContent="space-between" flexDirection="row" variant="unstyled" width="120px" fontFamily="mono" _focus={{
            outline: "none",
        }} onClick={pickFileHandler}>
            <react_2.Icon aria-label="Upload a file" fill="#fff" height="30px" width="auto" as={ai_1.AiOutlineCloudUpload}></react_2.Icon>
            <react_2.Text color="#fff">Upload Txt</react_2.Text>
          </react_2.Button>
          {wordsCount > 0 && (<react_2.Badge fontSize="sm" color="#fff" border="solid 1px green" rounded="lg" justifySelf="flex-start" variant="outline" px="2" py="1px">
              {wordsCount} Words
            </react_2.Badge>)}
          <react_2.Button px={4} justifySelf="flex-end" rounded="xl" type="submit" variant="outline" color="#fff" _hover={{ color: "#000", backgroundColor: "#fff" }} _focus={{
            outline: "none",
        }}>
            {loading ? (<react_loader_spinner_1.TailSpin color="#00BFFF" height={30} width={30}/>) : ("Summarize")}
          </react_2.Button>
        </react_2.Flex>
      </form>
    </react_2.Flex>);
};
exports.default = TextForm;
//# sourceMappingURL=TextForm.js.map