import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk('pizza/fetchPizza', async props => {
	const {
		category,
		namePropetry,
		orderProperty,
		searchPizzaName,
		currentPage,
	} = props

	const { data } = await axios.get(
		`https://62cd07e7a43bf78008509237.mockapi.io/items?${searchPizzaName}&page=${currentPage}&limit=4&category=${category}&sortBy=${namePropetry}&order=${orderProperty}`
	)

	return data
})

const initialState = {
	items: [],
	status: 'idle',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setState(state, action) {
			state.items = action.payload
		},
	},

	extraReducers: {
		[fetchPizza.pending]: state => {
			state.items = []
			state.status = 'loading'
		},
		[fetchPizza.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'fulfilled'
		},
		[fetchPizza.rejected]: state => {
			state.items = []
			state.status = 'error'
		},
	},
})

const { setState } = pizzaSlice.actions

export default pizzaSlice
