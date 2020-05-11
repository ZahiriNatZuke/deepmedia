import {Resource} from "./resource";
import {Channel} from "./channel";

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
  favorite_for_who: Channel[];
  channel: Channel;
}
