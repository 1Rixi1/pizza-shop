import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filter/slice'
import cartReducer from './cart/slice'
import pizzaReducer from './pizza/slice'
import { useDispatch } from 'react-redux'

const store = configureStore({
	reducer: { filter: filterReducer, cart: cartReducer, pizza: pizzaReducer },
})

export default store

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
