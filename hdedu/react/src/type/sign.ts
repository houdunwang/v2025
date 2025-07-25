import { IUser } from "./user";

export interface ISign {
	id: number;
	user_id: number;
	mood: string;
	content: string;
	created_at: string;
	updated_at: string;
	user: IUser;
	sign_count: {
		year: number;
		month: number;
		total: number
	}
}