/* eslint-disable @typescript-eslint/no-non-null-assertion */

import request from "supertest";
import express, { Express } from "express";
import bodyParser from "body-parser";
import { generateFriendlike } from "../domain/test-objects/factories";
import { FriendlikesRepository } from "../domain/types";
import { friendlikesRouterFactory } from "./friendlikesRouter";
import { FakeFriendlikesRepository } from "../domain/test-objects/FakeFriendlikesRepository";

describe("friendlikes router", () => {
  let app: Express;
  let fakeFriendlikesRepo: FriendlikesRepository;

  beforeEach(async () => {
    app = express();
    fakeFriendlikesRepo = FakeFriendlikesRepository();

    app.use(bodyParser.json());
    app.use(friendlikesRouterFactory(fakeFriendlikesRepo));
  });

  describe("POST /friendlikes", () => {
    it("saves a new friendlike", async () => {
      const friendlike = generateFriendlike({ send_to_user_id: "123" });
      const response = await request(app).post("/friendlikes").send(friendlike);

      expect(response.status).toEqual(200);
      let likes = await fakeFriendlikesRepo.findForUserId("123");
      expect(likes).toHaveLength(1);
      expect(likes[0]).toEqual(friendlike);

      const friendlike2 = generateFriendlike({ send_to_user_id: "123" });
      await request(app).post("/friendlikes").send(friendlike2);

      likes = await fakeFriendlikesRepo.findForUserId("123");
      expect(likes).toHaveLength(2);
      expect(likes).toEqual(expect.arrayContaining([friendlike, friendlike2]));
    });
  });

  describe("GET /friendlikes/{userId}", () => {
    it("gets friendlikes for userId and deletes them from DB", async () => {
      const like1 = generateFriendlike({ send_to_user_id: "123" });
      const like2 = generateFriendlike({ send_to_user_id: "456" });
      const like3 = generateFriendlike({ send_to_user_id: "123" });

      await fakeFriendlikesRepo.save(like1);
      await fakeFriendlikesRepo.save(like2);
      await fakeFriendlikesRepo.save(like3);

      const likes = (await request(app).get("/friendlikes/123")).body;
      expect(likes).toHaveLength(2);
      expect(likes).toEqual(expect.arrayContaining([like1, like3]));

      const likesForUser = await fakeFriendlikesRepo.findForUserId("123");
      expect(likesForUser).toEqual([]);

      const likesForOtherUser = await fakeFriendlikesRepo.findForUserId("456");
      expect(likesForOtherUser).toEqual([like2]);
    });
  });
});
