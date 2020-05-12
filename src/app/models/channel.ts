import {Resource} from "./resource";
import {User} from "./user";
import {Pivot} from "./pivot";
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
  pivot?: Pivot;
  videos?: Video[];
}
