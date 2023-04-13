import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

const Pagination = ({ changePagionation }) => {
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
		/>
	)
}

export default Pagination
