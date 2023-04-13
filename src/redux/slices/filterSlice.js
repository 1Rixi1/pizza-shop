import { createSlice } from '@reduxjs/toolkit'

const initialFilter = {
	categoryId: 0,
	sort: {
		name: 'Популярности(от большего)',
		sortProperty: 'rating',
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialFilter,

	reducers: {
		changeCategoryId(state, action) {
			state.categoryId = action.payload
		},
		changeSort(state, action) {
			state.sort = action.payload
		},
	},
})

export const { changeCategoryId, changeSort } = filterSlice.actions

export default filterSlice.reducer
