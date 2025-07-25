import { IConfig } from "@/type/config";

const data = {
	config: {}
} as { config: IConfig }

export const useConfig = () => {

	const config = <T extends keyof IConfig>(field: T) => {
		return data.config[field];
	}

	const set = (config: IConfig) => {
		data.config = config
	}
	return { config, set }
}

export type IConfigAuth = ReturnType<typeof useConfig>