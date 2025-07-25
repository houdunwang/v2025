import { ISubscribe } from "./subscribe";

export interface IUser {
	id: number;
	name: string;
	nickname: string;
	email: string;
	mobile: string;
	sex: number;
	address: string;
	real_name: string;
	avatar: string;
	home: string;
	weibo: string;
	wechat: string;
	github: string;
	qq: string;
	openid: string;
	unionid: string;
	email_verified_at: string;
	created_at: string;
	updated_at: string;
	is_administrator: boolean;
	subscribe?: ISubscribe
}