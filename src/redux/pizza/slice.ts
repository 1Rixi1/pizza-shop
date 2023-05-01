import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { itemPizza, pizzaSliceState, Status } from './types'
import { fetchPizza } from './getAsyncPizza'

const initialState: pizzaSliceState = {
	items: [],
	status: Status.IDLE,
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,

	reducers: {},

	extraReducers: builder => {
		builder.addCase(fetchPizza.pending, state => {
			state.items = []
			state.status = Status.LOADING
		})
		builder.addCase(
			fetchPizza.fulfilled,
			(state, action: PayloadAction<itemPizza[]>) => {
				state.items = action.payload
				state.status = Status.FULFILLED
			}
		)
		builder.addCase(fetchPizza.rejected, state => {
			state.items = []
			state.status = Status.ERROR
		})
	},
})

export default pizzaSlice.reducer
