import { IChapter } from "./chapter";

export interface ILesson {
	id: number;
	title: string;
	preview: string;
	description: string;
	price: string;
	order: number;
	video_num: number;
	download_address: string;
	type: string;
	created_at: string;
	updated_at: string;
	chapters: IChapter[];
	isBuy: boolean;
}