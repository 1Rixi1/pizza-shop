import React from 'react'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

function Categories({ value, changeValue }) {
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
