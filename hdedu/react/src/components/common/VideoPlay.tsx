import { FC, useEffect } from 'react';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css'
interface Props {
	url: string
}
export const VideoPlay: FC<Props> = ({ url }) => {
	useEffect(() => {
		new Player({
			id: 'mse',
			url,
			fluid: true
		});
	}, [url])
	return (
		<div id="mse" className=''></div>
	)
}
