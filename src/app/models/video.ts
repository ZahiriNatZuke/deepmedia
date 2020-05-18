import {Resource} from "./resource";
import {Channel} from "./channel";
import {Comment} from "./comment";
import {User} from "./user";

export class Video {
  id: number;
  channel_id: number;
  title: string;
  description: string;
  state: string;
  category: string;
  poster: Resource;
  video: Resource;
  views_count: number;
  created_at: string;
  updated_at: string;
  comments_count: number;
  likes_count: number;
  comments?: Comment[];
  favorite_for_who: Channel[];
  channel: Channel;
  likes: User[];
}
