import { IUser } from "./user";

export interface ITopic {
	id: number;
	user_id: number;
	title: string;
	content: string;
	html: string;
	created_at: string;
	updated_at: string;
	user: IUser
}