export interface INotification {
	id: string;
	type: string;
	notifiable_type: string;
	notifiable_id: number;
	data: Data;
	read_at: null;
	created_at: string;
	updated_at: string;
}

interface Data {
	model: string;
	model_id: number;
	content: string;
}