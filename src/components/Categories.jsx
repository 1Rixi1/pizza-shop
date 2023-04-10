import React from 'react'

function Categories({ value, changeValue }) {

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map((name, i) => (
					<li
						key={i}
						className={value === i ? 'active' : ''}
						onClick={() => changeValue(i)}
					>
						{name}
					</li>
				))}
			</ul>
		</div>
	)
}

export default Categories
