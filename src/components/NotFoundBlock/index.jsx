import React from 'react'

import styles from './NotFound.module.scss'

export const NotFoundBlock = () => {
	return (
		<div className={styles.content}>
			<span>😕</span>
			<h1>Ничего не найдено</h1>
			<p className={styles.description}>
				Данная страница остутствует в нашем интернет магазине
			</p>
		</div>
	)
}

export default NotFoundBlock
