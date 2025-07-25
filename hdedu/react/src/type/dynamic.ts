import { IUser } from "./user";

export interface IDynamic {
	id: number;
	dynamicable_type: string;
	dynamicable_id: number;
	user_id: number;
	properties: { model: string, model_id: number }
	created_at: string;
	updated_at: string;
	title: string;
	user: IUser;
}