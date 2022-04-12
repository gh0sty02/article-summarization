import axios from "axios";
import { IData } from "./types";

export const makeRequest = async (text: string) => {
  const {
    data,
  }: {
    data: IData;
  } = await axios.post(
    `https://article-summarization-react.herokuapp.com/`,
    { data: text },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
