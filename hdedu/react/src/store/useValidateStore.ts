import { create } from 'zustand'

interface ValidateState {
	errors: Record<string, string[]>
	setErrors: (errors: Record<string, string[]>) => void
	resetErrors: () => void
}

export const useValidateStroe = create<ValidateState>()((set) => ({
	errors: {},
	setErrors: (errors) => set((state) => {
		return { errors: { ...state.errors, ...errors } }
	}),
	resetErrors: () => set({ errors: {} })
}))