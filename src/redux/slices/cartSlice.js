import { createSlice } from '@reduxjs/toolkit'
import { getItemsCarsLS } from '../../utils/getItemsCarsLS'
import { getTotalPrice } from '../../utils/getTotalPrice'

const { items, totalPrice } = getItemsCarsLS()

const initialState = {
	totalPrice: totalPrice,
	items: items,
}

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

			state.totalPrice = getTotalPrice(state.items)
		},
		removeItem(state, action) {
			const cartPizza = state.items.find(
				itemPizza => itemPizza.id === action.payload
			)

			cartPizza.count--

			state.totalPrice = getTotalPrice(state.items)
		},
		resetPizzaItem(state, action) {
			state.items = state.items.filter(
				itemPizza => itemPizza.id !== action.payload
			)
			state.totalPrice = getTotalPrice(state.items)
		},
		resetItems(state, action) {
			state.items = []
			state.totalPrice = getTotalPrice(state.items)
		},
	},
})

export const selectCart = state => state.cart

export const { addItem, removeItem, resetPizzaItem, resetItems } =
	cartSlice.actions

export default cartSlice.reducer
