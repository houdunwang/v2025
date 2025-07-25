import { IUser } from "./user";

export interface IOrder {
	id: number;
	user_id: number;
	orderable_type: string;
	orderable_id: number;
	sn: string;
	subject: string;
	price: string;
	pay_state: number;
	pay_type: string;
	trade_no: string;
	created_at: string;
	updated_at: string;
	user: IUser
}