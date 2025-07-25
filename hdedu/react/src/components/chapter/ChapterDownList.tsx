import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { IChapter } from '@/type/chapter';
import { ListTop } from '@icon-park/react';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';


export const ChapterDownList: FC<{ chapters: IChapter[] }> = ({ chapters }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size={'sm'}><ListTop theme="outline" size="16" />章节列表</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{chapters.map(chapter => (
					<DropdownMenuItem key={chapter.id} asChild>
						<Link to='/chapter/$id' params={{ id: chapter.id }} >
							{chapter.title}
						</Link>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
