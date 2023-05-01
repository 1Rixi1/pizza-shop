import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchPizzaArgs, itemPizza } from './types'

export const fetchPizza = createAsyncThunk<itemPizza[], fetchPizzaArgs>(
	'pizza/fetchPizza',
	async props => {
		const {
			searchPizzaName,
			currentPage,
			category,
			namePropetry,
			orderProperty,
		} = props

		const { data } = await axios.get(
			`https://62cd07e7a43bf78008509237.mockapi.io/items?${searchPizzaName}&page=${currentPage}&limit=4&category=${category}&sortBy=${namePropetry}&order=${orderProperty}`
		)

		return data
	}
)
