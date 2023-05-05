import React from 'react'

const categories = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые',
]

type CategoriesProps = {
	value: number
	changeValue: (i: number) => void
}

export const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, changeValue }) => {
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
)

