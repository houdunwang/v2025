export interface IPaginate<T> {
	data: T[];
	links: Links;
	meta: IMeta;
}

export interface IMeta {
	current_page: number;
	from: number;
	last_page: number;
	links: ILink[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface ILink {
	url: null | string;
	label: string;
	active: boolean;
}

interface Links {
	first: string;
	last: string;
	prev: null;
	next: null;
}

