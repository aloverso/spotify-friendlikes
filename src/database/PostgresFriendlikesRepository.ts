import Knex from "knex";
import { Friendlike, FriendlikesRepository } from "../domain/types";

export const PostgresFriendlikesRepository = (kdb: Knex): FriendlikesRepository => {
  const save = (friendlike: Friendlike): Promise<void> => {
    return kdb("friendlikes")
      .insert<Friendlike>(friendlike)
      .then(async () => {
        return Promise.resolve();
      })
      .catch((e) => {
        console.error("db error: ", e);
        return Promise.reject();
      });
  };

  const findForUserId = async (userId: string): Promise<Friendlike[]> => {
    return await kdb("friendlikes")
      .where("send_to_user_id", userId)
      .orderBy("timestamp")
      .catch((e) => {
        console.error("db error: ", e);
        return Promise.reject();
      });
  };

  const deleteLikes = async (ids: string[]): Promise<void> => {
    for (const id of ids) {
      await kdb("friendlikes")
        .where({ id: id })
        .del()
        .catch((e) => {
          console.error("db error: ", e);
          return Promise.reject();
        });
    }
  };

  const disconnect = async (): Promise<void> => {
    await kdb.destroy();
  };

  const deleteAll = async (): Promise<void> => {
    await kdb("friendlikes").del();
  };

  return {
    save,
    findForUserId,
    deleteLikes,
    disconnect,
    deleteAll,
  };
};
