import { IUser } from "./user";
import { IVideo } from "./video";

export interface ILearn {
	id: number;
	user_id: number;
	video_id: number;
	lesson_id: number;
	chapter_id: number;
	created_at: string;
	updated_at: string;
	video: IVideo;
	user: IUser;
}