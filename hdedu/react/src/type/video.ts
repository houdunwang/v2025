import { IChapter } from "./chapter";
import { ILesson } from "./lesson";

export interface IVideo {
	id: number;
	lesson_id: number;
	chapter_id: number;
	title: string;
	path: string;
	order: number;
	created_at: string;
	updated_at: string;
	chapter: IChapter;
	lesson: ILesson
}