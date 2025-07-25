import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { IMeta } from '@/type/paginate'
import classNames from 'classnames'
import { FC } from 'react'
interface Props {
	meta: IMeta
	onChange?: (page: number) => void;
	singleShow?: boolean
}

export const Page: FC<Props> = ({ meta, singleShow = true, onChange }) => {
	if (meta.last_page == 1 && !singleShow) return
	return <Pagination>
		<PaginationContent>
			{meta.links.map((link, index) => (
				<PaginationItem key={index}>
					<PaginationLink to={link.url || '#'} size={'default'}
						className={classNames('border', {
							'bg-primary hover:bg-primary text-white hover:text-white! cursor-default': link.active,
							'bg-muted opacity-50 text-muted-foreground! hover:text-muted-foreground! cursor-default': !link.url
						})}
						dangerouslySetInnerHTML={{ __html: link.label }}
						onClick={e => {
							if (!link.url || link.active || onChange) e.preventDefault()
							if (onChange) onChange(Number(link.label))
						}}></PaginationLink>
				</PaginationItem>
			))}
		</PaginationContent>
	</Pagination>
}
