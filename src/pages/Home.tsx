import React from 'react'

import { useNavigate } from 'react-router-dom'

// Компоненты
import Categories from '../components/Categories'
import SortPopUp, { sortNames } from '../components/SortPopUp'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/index'

//Библ. для парсинга данных из Url
import qs from 'qs'

//redux
import { useSelector } from 'react-redux'
import {
	changeCategoryId,
	changeSort,
	changePage,
	setFilters,
} from '../redux/filter/slice'

import { Sort, filterSliceState } from '../redux/filter/types'
import { selectFilter } from '../redux/filter/selectors'

import { fetchPizza } from '../redux/pizza/getAsyncPizza'
import { Status, fetchPizzaArgs } from '../redux/pizza/types'
import { useAppDispatch } from '../redux/store'
import { itemPizza } from '../redux/pizza/types'
import { selectPizza } from '../redux/pizza/selectors'

const Home: React.FC = () => {
	const { searchValue } = useSelector(selectFilter)

	//нужно ли делать первый запрос
	const isSearch = React.useRef(false)
	//Есть ли параметры в Url
	const isParamsUrl = React.useRef(false)

	const navigate = useNavigate()

	//redux
	const dispatch = useAppDispatch()
	// Получаем из Redux Category , Sort, Page
	const { categoryId, sort, currentPage } = useSelector(selectFilter)

	// сохраняем пиццы из redux
	const { items, status } = useSelector(selectPizza)

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
			} as fetchPizzaArgs)
		)

		window.scrollTo(0, 0)
	}

	React.useEffect(() => {
		if (window.location.search) {
			const objParams = qs.parse(window.location.search.substring(1))

			const sort = sortNames.find(
				objSort => objSort.sortProperty === objParams.sortProperty
			) as Sort

			dispatch(
				setFilters({
					...objParams,
					sort: sort,
				} as filterSliceState)
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

	const pizza = items.map((objItem: itemPizza) => (
		<PizzaBlock key={objItem.id} {...objItem} />
	))

	const fakePizza = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

	const changeCategoriesValue = React.useCallback((id: number) => {
		dispatch(changeCategoryId(id))
	}, [])

	const changeSortPopUpValue = React.useCallback((objValue: Sort) => {
		dispatch(changeSort(objValue))
	}, [])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} changeValue={changeCategoriesValue} />

				<SortPopUp value={sort} changeValue={changeSortPopUpValue} />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === Status.LOADING ? (
					fakePizza
				) : status === Status.ERROR ? (
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
