import { FriendlikesRepositoryTest } from "../FriendlikesRepositoryTestFactory";
import { FakeFriendlikesRepository } from "./FakeFriendlikesRepository";

describe("FakeFriendlikesRepository", () => {
  const repo = FakeFriendlikesRepository();
  FriendlikesRepositoryTest(repo);
});
