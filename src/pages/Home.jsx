import React from 'react'

import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/index.jsx'
import { SearchValue } from '../App.js'

//axios - для запросов
import axios from 'axios'

//redux
import { useSelector, useDispatch } from 'react-redux'
import {
	changeCategoryId,
	changeSort,
	changePage,
} from '../redux/slices/filterSlice.js'
const Home = () => {
	//redux
	const dispatch = useDispatch()
	// Получаем из Redux Category , Sort, Page
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	// сохраняем пиццы
	const [items, setItems] = React.useState([])
	//Context
	const { searchInput } = React.useContext(SearchValue)

	const [isLoading, setIsLoadig] = React.useState(true)



	//Данные о параметрах, которые передаются в url:

	const category = categoryId > 0 ? categoryId : ''
	const namePropetry = sort.sortProperty.replace('-', '')
	const orderProperty = sort.sortProperty.includes('-') ? 'ask' : 'desc'
	const searchPizzaName = searchInput ? `title=${searchInput}` : ''
	//

	//Получение Pizzas
	React.useEffect(() => {
		setIsLoadig(true)

		axios
			.get(
				`https://62cd07e7a43bf78008509237.mockapi.io/items?${searchPizzaName}&page=${currentPage}&limit=4&category=${category}&sortBy=${namePropetry}&order=${orderProperty}`
			)
			.then(res => {
				setItems(res.data)
				setIsLoadig(false)
			})

		window.scrollTo(0, 0)
	}, [categoryId, sort, searchInput, currentPage])

	//Пиццы и Fake-данные пицц:

	const pizza = items.map(objItem => (
		<PizzaBlock key={objItem.id} {...objItem} />
	))

	const fakePizza = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	//

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					changeValue={id => dispatch(changeCategoryId(id))}
				/>

				<Sort
					value={sort}
					changeValue={objValue => dispatch(changeSort(objValue))}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? fakePizza : pizza}</div>

			<Pagination
				currentPage={currentPage}
				changePagionation={pageNumber => dispatch(changePage(pageNumber))}
			/>
		</div>
	)
}

export default Home
