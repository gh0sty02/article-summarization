import { FC, FormEvent, useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { TailSpin } from "react-loader-spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IData } from "../utils/types";
import { makeRequest } from "../utils/request";

const TextForm: FC<{
  getSummary: (data: IData) => void;
}> = ({ getSummary }) => {
  const [text, setText] = useState("");
  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(false);
  const [wordsCount, setWordsCount] = useState(0);
  const [fileName, setFileName] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const txtWordCount = (text: string) => {
    return text.split(" ").length;
  };

  if (!loading && data) {
    getSummary(data);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (text) {
      await makeRequest(text).then((data) => {
        setData(data);

        setLoading(false);
      });
    }
  };

  const pickFileHandler = () => {
    inputFileRef.current?.click();
  };
  const pickedHandler = (e: HTMLInputElement) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const txtData = e.target?.result;
      setText(txtData as string);
      setWordsCount(txtWordCount(txtData as string));
    };
    if (e.files) {
      reader.readAsText(e.files[0]) as unknown as string;
      setFileName(e.files[0].name);
    }
  };

  return (
    <Flex direction="column">
      <form onSubmit={submitHandler}>
        {fileName && (
          <Box
            textAlign="center"
            pt="2"
            pb="2"
            mb="-2"
            as="p"
            fontSize="sm"
            fontWeight="medium"
            color="#fff"
          >
            {fileName}
          </Box>
        )}
        <Textarea
          cols={50}
          border="none"
          rows={22}
          resize="none"
          required
          pt={2}
          color="white"
          _focus={{
            _placeholder: {
              color: "transparent",
            },
          }}
          placeholder="Paste or write about your topic, then click the Summarize button."
          _placeholder={{
            paddingLeft: "2rem",
            color: "#fff",
            fontSize: "md",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="file"
          display="none"
          accept=".txt"
          ref={inputFileRef}
          onChange={(e) => pickedHandler(e.target)}
          onClick={pickFileHandler}
        />

        <Flex
          px={4}
          justify="space-between"
          align="center"
          pb={2}
          direction="row"
        >
          <Button
            display="flex"
            justifyContent="space-between"
            flexDirection="row"
            variant="unstyled"
            width="120px"
            fontFamily="mono"
            _focus={{
              outline: "none",
            }}
            onClick={pickFileHandler}
          >
            <Icon
              aria-label="Upload a file"
              fill="#fff"
              height="30px"
              width="auto"
              as={AiOutlineCloudUpload}
            ></Icon>
            <Text color="#fff">Upload Txt</Text>
          </Button>
          {wordsCount > 0 && (
            <Badge
              fontSize="sm"
              color="#fff"
              border="solid 1px green"
              rounded="lg"
              justifySelf="flex-start"
              variant="outline"
              px="2"
              py="1px"
            >
              {wordsCount} Words
            </Badge>
          )}
          <Button
            px={4}
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
            {loading ? (
              <TailSpin color="#00BFFF" height={30} width={30} />
            ) : (
              "Summarize"
            )}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default TextForm;
