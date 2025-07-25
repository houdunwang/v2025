import { ILesson } from "./lesson";
import { IVideo } from "./video";

export interface IChapter {
	id: number;
	lesson_id: number;
	title: string;
	preview: string;
	description: string;
	video_num: number;
	order: number;
	created_at: string;
	updated_at: string;
	videos: IVideo[]
	lesson: ILesson
}