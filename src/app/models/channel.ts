import {Resource} from "./resource";
import {User} from "./user";
import {Pivot} from "./pivot";

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
}
