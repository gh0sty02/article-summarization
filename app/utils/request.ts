import axios from "axios";
import { IData } from "./types";

export const makeRequest = async (text: string) => {
  const {
    data,
  }: {
    data: IData;
  } = await axios.post(
    `http://localhost:5000/`,
    { data: text },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
