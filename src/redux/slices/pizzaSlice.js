import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizza = createAsyncThunk(
	'pizza/fetchPizza',
	async (props, thunkAPI) => {
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

		if (data.length === 0) {
			return thunkAPI.rejectWithValue('Error11')
		} else {
			return thunkAPI.fulfillWithValue(data)
		}
	}
)

const initialState = {
	items: [],
	status: 'idle',
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,

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

export const { setitems } = pizzaSlice.actions

export default pizzaSlice.reducer
