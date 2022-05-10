/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { FriendlikesRepository } from "./types";
import { generateFriendlike } from "./test-objects/factories";
import dayjs from "dayjs";

export const FriendlikesRepositoryTest = (friendlikesRepoToTest: FriendlikesRepository): void => {
  let friendlikesRepo: FriendlikesRepository;

  beforeEach(async () => {
    friendlikesRepo = friendlikesRepoToTest;
    await friendlikesRepo.deleteAll();
  });

  describe("findAllByUserId", () => {
    it("finds likes sent to a user id", async () => {
      const like1 = generateFriendlike({ send_to_user_id: "123" });
      const like2 = generateFriendlike({ send_to_user_id: "456" });
      const like3 = generateFriendlike({ send_to_user_id: "123" });

      await friendlikesRepo.save(like1);
      await friendlikesRepo.save(like2);
      await friendlikesRepo.save(like3);

      const likes = await friendlikesRepo.findForUserId("123");
      expect(likes.length).toEqual(2);
      expect(likes).toEqual(expect.arrayContaining([like1, like3]));
    });

    it("returns empty list when none", async () => {
      const likes = await friendlikesRepo.findForUserId("123");
      expect(likes).toEqual([]);
    });

    it("orders by oldest to newest", async () => {
      const like1 = generateFriendlike({
        send_to_user_id: "123",
        timestamp: dayjs().add(1, "minute").toISOString(),
      });

      const like2 = generateFriendlike({
        send_to_user_id: "123",
        timestamp: dayjs().add(5, "minute").toISOString(),
      });

      const like3 = generateFriendlike({
        send_to_user_id: "123",
        timestamp: dayjs().subtract(1, "minute").toISOString(),
      });

      await friendlikesRepo.save(like1);
      await friendlikesRepo.save(like2);
      await friendlikesRepo.save(like3);

      const likes = await friendlikesRepo.findForUserId("123");
      expect(likes.length).toEqual(3);
      expect(likes).toEqual([like3, like1, like2]);
    });
  });

  describe("deleteLikes", () => {
    it("deletes likes by list of ids", async () => {
      const like1 = generateFriendlike({ id: "123", send_to_user_id: "123" });
      const like2 = generateFriendlike({ id: "456", send_to_user_id: "123" });
      const like3 = generateFriendlike({ id: "789", send_to_user_id: "123" });

      await friendlikesRepo.save(like1);
      await friendlikesRepo.save(like2);
      await friendlikesRepo.save(like3);

      await friendlikesRepo.deleteLikes(["123", "789"]);
      const likes = await friendlikesRepo.findForUserId("123");
      expect(likes.length).toEqual(1);
      expect(likes).toEqual([like2]);
    });
  });

  afterAll(async () => {
    await friendlikesRepo.disconnect();
  });
};
