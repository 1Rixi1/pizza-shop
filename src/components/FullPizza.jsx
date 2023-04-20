import axios from 'axios'
import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

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
		<div className=''>
			<img src={pizza.imageUrl} alt='imgPizza' />
			<p>{pizza.title}</p>
			<p>Price: {pizza.price}</p>
		</div>
	)
}

export default FullPizza
