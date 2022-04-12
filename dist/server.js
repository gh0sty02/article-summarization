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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain"),
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use((0, cors_1.default)());
let filteredData;
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const filePath = path_1.default.join("main.py");
        const pythonProcess = (0, child_process_1.spawn)("python", [filePath, data]);
        pythonProcess.stdout.on("data", function (data) {
            const arrayData = JSON.parse(data.toString());
            const topics = Object.entries(arrayData[0]).map((e, i) => ({
                i: JSON.parse(e[1].replace(/'/g, '"').replace(/\(/g, "[").replace(/\)/g, "]")),
            }));
            const summaries = arrayData[1][0].summary;
            filteredData = [topics, summaries];
        });
        pythonProcess.on("close", (code) => {
            res.json(filteredData);
            console.log(`child process close all stdio with code ${code} `);
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.status,
        });
    }
}));
app.listen(port, () => {
    console.log(`server ready on port ${port}`);
});
//# sourceMappingURL=server.js.map