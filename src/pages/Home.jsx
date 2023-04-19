import React from 'react'

import { useNavigate } from 'react-router-dom'

// Компоненты
import Categories from '../components/Categories.jsx'
import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/index.jsx'

import { sortNames } from '../components/Sort.jsx'

//Библ. для парсинга данных из Url
import qs from 'qs'

//redux
import { useSelector, useDispatch } from 'react-redux'
import {
	changeCategoryId,
	changeSort,
	changePage,
	setFilters,
	selectFilter,
} from '../redux/slices/filterSlice.js'

import { fetchPizza } from '../redux/slices/pizzaSlice.js'

const Home = () => {
	const { searchValue } = useSelector(selectFilter)

	//нужно ли делать первый запрос
	const isSearch = React.useRef(false)
	//Есть ли параметры в Url
	const isParamsUrl = React.useRef(false)

	const navigate = useNavigate()

	//redux
	const dispatch = useDispatch()
	// Получаем из Redux Category , Sort, Page
	const { categoryId, sort, currentPage } = useSelector(selectFilter)

	// сохраняем пиццы из redux
	const { items, status } = useSelector(state => state.pizza)
	// const [items, setItems] = React.useState([])
	//Context

	//Данные о параметрах, которые передаются в url:

	const category = categoryId > 0 ? categoryId : ''
	const namePropetry = sort.sortProperty.replace('-', '')
	const orderProperty = sort.sortProperty.includes('-') ? 'ask' : 'desc'
	const searchPizzaName = searchValue ? `title=${searchValue}` : ''

	// Получение Pizzas
	function getPizza() {
		dispatch(
			fetchPizza({
				searchPizzaName,
				currentPage,
				category,
				namePropetry,
				orderProperty,
			})
		)

		window.scrollTo(0, 0)
	}

	React.useEffect(() => {
		if (window.location.search) {
			const objParams = qs.parse(window.location.search.substring(1))

			const sort = sortNames.find(
				objSort => objSort.sortProperty === objParams.sortProperty
			)

			dispatch(
				setFilters({
					...objParams,
					sort,
				})
			)

			isSearch.current = true
		}
	}, [])

	React.useEffect(() => {
		if (!isSearch.current) {
			getPizza()
		}

		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	React.useEffect(() => {
		if (isParamsUrl.current) {
			const stringParams = qs.stringify({
				categoryId,
				sortProperty: sort.sortProperty,
				currentPage,
			})

			navigate(`?${stringParams}`)
		}

		isParamsUrl.current = true
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	//Пиццы и Fake-данные пицц:

	const pizza = items.map(objItem => (
		<PizzaBlock key={objItem.id} {...objItem} />
	))

	const fakePizza = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

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
			<div className='content__items'>
				{status === 'pending' ? (
					fakePizza
				) : status === 'error' ? (
					<p className='error__message'>
						Произошла ошибка 😕 Не удалось получить пиццы.Перезагрузите страницу
						или повторите попытку позже{' '}
					</p>
				) : (
					pizza
				)}
			</div>

			<Pagination
				currentPage={currentPage}
				changePagionation={pageNumber => dispatch(changePage(pageNumber))}
			/>
		</div>
	)
}

export default Home
