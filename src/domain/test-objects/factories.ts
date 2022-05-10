import { Friendlike } from "../types";

const randomInt = (): number => Math.floor(Math.random() * Math.floor(10000000));

export const generateFriendlike = (overrides: Partial<Friendlike>): Friendlike => {
  return {
    id: `some-id-${randomInt()}`,
    timestamp: `some-timestamp-${randomInt()}`,
    send_to_user_id: `some-send_to_user_id-${randomInt()}`,
    liked_by_user_id: `some-liked_by_user_id-${randomInt()}`,
    liked_by_user_name: `some-liked_by_user_name-${randomInt()}`,
    track_name: `some-track_name-${randomInt()}`,
    artist_name: `some-artist_name-${randomInt()}`,
    track_uri: `some-track_uri-${randomInt()}`,
    artist_uri: `some-artist_uri-${randomInt()}`,
    ...overrides,
  };
};
