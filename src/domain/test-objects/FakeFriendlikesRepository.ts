/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Friendlike, FriendlikesRepository } from "../types";

export const FakeFriendlikesRepository = (): FriendlikesRepository => {
  let friendlikes: Record<string, Friendlike> = {};

  const save = (friendlike: Friendlike): Promise<void> => {
    friendlikes[friendlike.id] = friendlike;
    return Promise.resolve();
  };

  const findForUserId = (userId: string): Promise<Friendlike[]> => {
    return Promise.resolve(
      Object.values(friendlikes)
        .filter((it) => it.send_to_user_id === userId)
        .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
    );
  };

  const deleteLikes = (ids: string[]): Promise<void> => {
    for (const id of ids) {
      delete friendlikes[id];
    }
    return Promise.resolve();
  };

  const disconnect = (): Promise<void> => {
    return Promise.resolve();
  };

  const deleteAll = (): Promise<void> => {
    friendlikes = {};
    return Promise.resolve();
  };

  return {
    save,
    findForUserId,
    deleteLikes,
    disconnect,
    deleteAll,
  };
};
