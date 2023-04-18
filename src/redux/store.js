import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'

const store = configureStore({
	reducer: { filter: filterReducer, cart: cartReducer },
})

export default store
