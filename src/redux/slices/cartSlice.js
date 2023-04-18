import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	items: [],
}

const calculateTotalPrice = items =>
	items.reduce((sum, itemPizza) => itemPizza.price * itemPizza.count + sum, 0)

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const newItem = state.items.find(
				objPizza => objPizza.id === action.payload.id
			)

			if (newItem) {
				newItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = calculateTotalPrice(state.items)
		},
		removeItem(state, action) {
			const cartPizza = state.items.find(
				itemPizza => itemPizza.id === action.payload
			)

			if (cartPizza.count === 1) {
				state.items = state.items.filter(
					itemPizza => itemPizza.id !== action.payload
				)
			} else {
				cartPizza.count--
			}

			state.totalPrice = calculateTotalPrice(state.items)
		},
		resetPizzaItems(state, action) {
			state.items = state.items.filter(
				itemPizza => itemPizza.id !== action.payload
			)
		},
		resetItems(state, action) {
			state.items = []
			state.totalPrice = calculateTotalPrice(state.items)
		},
	},
})

export const { addItem, removeItem, resetPizzaItems, resetItems } =
	cartSlice.actions

export default cartSlice.reducer
