import {Resource} from "./resource";
import {User} from "./user";
import {PivotChannelVideo} from "./pivot-channel-video";
import {Video} from "./video";

export class Channel {
  id: number;
  user_id: number;
  avatar: Resource;
  created_at: string;
  updated_at: string;
  videos_count: number;
  my_favorites_count: number;
  user: User;
  pivot?: PivotChannelVideo;
  videos?: Video[];
}
