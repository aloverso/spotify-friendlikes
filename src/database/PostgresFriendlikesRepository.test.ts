import { buildPgConnectionString } from "./buildPgConnectionString";
import knex from "knex";
import { PostgresFriendlikesRepository } from "./PostgresFriendlikesRepository";
import { FriendlikesRepositoryTest } from "../domain/FriendlikesRepositoryTestFactory";

describe("PostgresFriendlikesRepository", () => {
  const connection = buildPgConnectionString({
    user: "postgres",
    host: "localhost",
    database: "spotifyfriendlikestest",
    password: "",
    port: 5432,
  });

  const kdb = knex({
    client: "pg",
    connection: {
      connectionString: connection,
      ssl: false,
    },
  });

  let spy: jest.SpyInstance;

  beforeAll(() => {
    spy = jest.spyOn(console, "error").mockImplementation();
  });

  afterAll(() => {
    spy.mockRestore();
    kdb.destroy();
  });

  const friendlikesRepo = PostgresFriendlikesRepository(kdb);
  FriendlikesRepositoryTest(friendlikesRepo);
});
