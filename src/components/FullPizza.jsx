import axios from 'axios'
import React from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
	const navigate = useNavigate()
	const [pizza, setPizza] = React.useState()

	const { id } = useParams()

	React.useEffect(() => {
		const fetchPizza = async () => {
			try {
				const { data } = await axios.get(
					`https://62cd07e7a43bf78008509237.mockapi.io/items/${id}`
				)
				setPizza(data)
			} catch (error) {
				alert('Ошибка при получении пиццы!')
				navigate('/')
			}
		}

		fetchPizza()
	}, [])

	if (!pizza) return <p>Загрузка...</p>

	return (
		<>
			<div className='fullPizza'>
				<div className='fullPizza__wrapper'>
					<img className='fullPizza__img' src={pizza.imageUrl} alt='imgPizza' />
					<Link to={'/'} className='button button--outline button--add go-back-btn test'>
						Вернуться назад
					</Link>
				</div>

				<div className='fullPizza__desc'>
					<p className='fullPizza__title'>Пицца: {pizza.title}</p>
					<p className='fullPizza__price'>цена: {pizza.price}</p>
					<p>
						Описание: Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						Reiciendis nemo sunt vitae, accusamus impedit ullam consequuntur
						perferendis, omnis placeat ab voluptatum facilis mollitia dolore
						delectus cumque! Reiciendis id impedit quod.{' '}
					</p>
				</div>
			</div>
		</>
	)
}

export default FullPizza
