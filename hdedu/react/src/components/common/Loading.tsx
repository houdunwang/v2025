import { FC } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

export const Loading: FC<{ className?: string }> = ({ className }) => {
	return (
		<div className={`${className} flex justify-center items-center`}>
			<ScaleLoader color="#2ecc71" />
		</div>
	)
}
