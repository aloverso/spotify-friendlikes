import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from 'cors';
import { buildPgConnectionString } from "./database/buildPgConnectionString";
import knex from "knex";
import { PostgresFriendlikesRepository } from "./database/PostgresFriendlikesRepository";
import { friendlikesRouterFactory } from "./routes/friendlikesRouter";

const connection =
  process.env.DATABASE_URL ||
  buildPgConnectionString({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "spotifyfriendlikeslocal",
    password: process.env.DB_PASS || "",
    port: 5432,
  });

const isLocal = !process.env.DATABASE_URL;

const kdb = knex({
  client: "pg",
  connection: {
    connectionString: connection,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  },
  pool: { min: 0, max: 15 },
});

const postgresFriendlikesRepo = PostgresFriendlikesRepository(kdb);

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", friendlikesRouterFactory(postgresFriendlikesRepo));

app.get("/health", (_req, res) => {
  res.status(200).send("Alive");
});

export default app;
