import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import patientRouter from "./api/patient/index.js";
import { pgConnect, syncModels } from "./db.js";

const server = express();
const port = process.env.PORT || 3001;

//---------------------middlewares--------------------------
server.use(cors());
server.use(express.json());

//---------------------endpoints--------------------------
server.use("/patient", patientRouter);

//---------------------errors--------------------------

await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Sever is running on ${port}`);
});
