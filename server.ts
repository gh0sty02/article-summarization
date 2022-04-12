import express, { Request, Response } from "express";
import { spawn } from "child_process";
import cors from "cors";
import path from "path";
import { parse } from "node-html-parser";
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/plain"),
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use(cors());

let filteredData: [{ i: string }[], string];

app.post("/", async (req: Request, res: Response) => {
  try {
    const { data }: { data: string } = req.body;

    const filePath = path.join("main.py");
    // console.log(filePath);
    const pythonProcess = spawn("python", [filePath, data]);

    pythonProcess.stdout.on("data", function (data: Buffer) {
      const arrayData: [
        { index: string },
        { topic: number; summary: string }[],
        { graph: string }
      ] = JSON.parse(data.toString());

      const topics = Object.entries(arrayData[0]).map((e, i) => ({
        i: JSON.parse(
          e[1].replace(/'/g, '"').replace(/\(/g, "[").replace(/\)/g, "]")
        ),
      }));

      const summaries = arrayData[1][0].summary;

      filteredData = [topics, summaries];
    });

    pythonProcess.on("close", (code) => {
      res.json(filteredData);
      console.log(`child process close all stdio with code ${code} `);
    });
  } catch (error) {
    res.status(500).json({
      message: error.status,
    });
  }
});

app.get("/", (req, res) => {
  res.send("hello there");
});

app.listen(port, () => {
  console.log(`server ready on port ${port}`);
});
