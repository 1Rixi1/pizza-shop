import React from 'react'

//redux
import { ItemCartPizza } from '../../redux/cart/types'

import { selectCart } from '../../redux/cart/selectors'
import { addItem } from '../../redux/cart/slice'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { itemPizza } from '../../redux/pizza/types'

const typeNames = ['тонкое', 'традиционное']

const PizzaBlock: React.FC<itemPizza> = ({
	id,
	imageUrl,
	title,
	types,
	sizes,
	price,
}) => {
	const dispatch = useDispatch()
	const { items } = useSelector(selectCart)

	const [activeType, setActiveType] = React.useState(0)
	const [activeSize, setActiveSize] = React.useState(0)

	const addItemCart = () => {
		dispatch(
			addItem({
				id,
				imageUrl,
				title,
				type: typeNames[activeType],
				size: sizes[activeSize],
				price,
				count: 0,
			})
		)
	}

	const itemPizza = items.find(
		(itemPizza: ItemCartPizza) => itemPizza.id === id
	)

	const count = itemPizza?.count || 0

	return (
		<div className='pizza-block__wrapper'>
			<div className='pizza-block'>
				<Link to={`pizza/${id}`}>
					<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
					<h4 className='pizza-block__title'>{title}</h4>
				</Link>
				<div className='pizza-block__selector'>
					<ul>
						{types.map(type => (
							<li
								key={type}
								className={activeType === type ? 'active' : ''}
								onClick={() => setActiveType(type)}
							>
								{typeNames[type]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, sizeIndex) => (
							<li
								key={size}
								className={activeSize === sizeIndex ? 'active' : ''}
								onClick={() => setActiveSize(sizeIndex)}
							>
								{size} см.
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} ₽</div>
					<button
						onClick={addItemCart}
						className='button button--outline button--add'
					>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span>Добавить</span>
						{count > 0 && <i>{count}</i>}
					</button>
				</div>
			</div>
		</div>
	)
}

export default PizzaBlock
