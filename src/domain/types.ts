export interface FriendlikesRepository {
  save: (friendlike: Friendlike) => Promise<void>;
  findForUserId: (userId: string) => Promise<Friendlike[]>;
  deleteLikes: (ids: string[]) => Promise<void>;
  deleteAll: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export interface Friendlike {
  id: string;
  timestamp: string;
  send_to_user_id: string;
  liked_by_user_id: string;
  liked_by_user_name: string;
  track_name: string;
  artist_name: string;
  track_uri: string;
  artist_uri: string;
}
