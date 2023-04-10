import React from 'react'

import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
	const [items, setItems] = React.useState([])

	const [isLoading, setIsLoadig] = React.useState(true)

	// Получаем state у : Category и Sort

	const [categoryId, setCategoryId] = React.useState(0)

	const [sort, setSort] = React.useState({
		name: 'Популярности(от большего)',
		sortProperty: 'rating',
	})
	//

	//Данные о параметрах, которые передаются в url:

	const category = categoryId > 0 ? categoryId : ''
	const namePropetry = sort.sortProperty.replace('-', '')
	const orderProperty = sort.sortProperty.includes('-') ? 'ask' : 'desc'

	//

	//Получение Pizzas
	React.useEffect(() => {
		fetch(
			`https://62cd07e7a43bf78008509237.mockapi.io/items?category=${category}&sortBy=${namePropetry}&order=${orderProperty}`
		).then(req =>
			req.json().then(resp => {
				setItems(resp)
				setIsLoadig(false)
			})
		)
		window.scrollTo(0, 0)
	}, [categoryId, sort])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} changeValue={id => setCategoryId(id)} />

				<Sort value={sort} changeValue={objValue => setSort(objValue)} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: items.map(objItem => <PizzaBlock key={objItem.id} {...objItem} />)}
			</div>
		</div>
	)
}

export default Home
