import { Request, Response, Router } from "express";
import { Friendlike, FriendlikesRepository } from "../domain/types";

export const friendlikesRouterFactory = (friendlikesRepo: FriendlikesRepository): Router => {
  const router = Router();

  router.post("/friendlikes", async (req: Request, res: Response) => {
    friendlikesRepo
      .save(req.body as Friendlike)
      .then(() => {
        res.status(200).send();
      })
      .catch(() => res.status(500).send());
  });

  router.get("/friendlikes/:id", async (req: Request, res: Response<Friendlike[]>) => {
    const friendlikes = await friendlikesRepo.findForUserId(req.params.id);
    const ids = friendlikes.map((it) => it.id);
    friendlikesRepo
      .deleteLikes(ids)
      .then(() => {
        res.json(friendlikes);
      })
      .catch(() => res.status(500).send());
  });

  return router;
};
