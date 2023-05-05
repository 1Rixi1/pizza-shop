import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = {
	changePagionation: (page: number) => void
	currentPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
	changePagionation,
	currentPage,
}) => {
	return (
		<ReactPaginate
			className={styles.paginate}
			pageRangeDisplayed={5}
			pageCount={3}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			renderOnZeroPageCount={null}
			onPageChange={e => changePagionation(e.selected + 1)}
			forcePage={currentPage - 1}
		/>
	)
}

