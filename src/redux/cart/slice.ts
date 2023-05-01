import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getItemsCarsLS } from '../../utils/getItemsCarsLS'
import { getTotalPrice } from '../../utils/getTotalPrice'
import { ItemCartPizza, cartSliceState } from './types'

const { items, totalPrice } = getItemsCarsLS()

const initialState: cartSliceState = {
	totalPrice: totalPrice,
	items: items,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<ItemCartPizza>) {
			const newItem = state.items.find(
				objPizza => objPizza.id === action.payload.id
			)

			if (newItem) {
				newItem.count && newItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}

			state.totalPrice = getTotalPrice(state.items)
		},
		removeItem(state, action: PayloadAction<string>) {
			const cartPizza = state.items.find(
				itemPizza => itemPizza.id === action.payload
			)

			cartPizza?.count && cartPizza.count--

			state.totalPrice = getTotalPrice(state.items)
		},
		resetPizzaItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				itemPizza => itemPizza.id !== action.payload
			)
			state.totalPrice = getTotalPrice(state.items)
		},
		resetItems(state) {
			state.items = []
			state.totalPrice = getTotalPrice(state.items)
		},
	},
})

export const { addItem, removeItem, resetPizzaItem, resetItems } =
	cartSlice.actions

export default cartSlice.reducer
