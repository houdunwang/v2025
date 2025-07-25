import { createContext, ReactNode, use, useState } from "react";
interface ContextProps {
	replyId: number;
	setReplyId: React.Dispatch<React.SetStateAction<number>>;
	modelName: string;
	setModelName: React.Dispatch<React.SetStateAction<string>>;
	modelId: number;
	setModelId: React.Dispatch<React.SetStateAction<number>>;
}
const CommentContext = createContext<ContextProps | undefined>(undefined)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [replyId, setReplyId] = useState(0)
	const [modelName, setModelName] = useState('')
	const [modelId, setModelId] = useState(0)
	return <CommentContext.Provider value={{ replyId, setReplyId, modelName, setModelName, modelId, setModelId }}>
		{children}
	</CommentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCommentContext = () => {
	const context = use(CommentContext)
	if (context === undefined) {
		throw new Error('useCommentContext must be used within a ContextProvider')
	}
	return context
}