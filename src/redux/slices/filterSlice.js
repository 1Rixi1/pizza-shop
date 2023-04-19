import { createSlice } from '@reduxjs/toolkit'

const initialFilter = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'Популярности(от большего)',
		sortProperty: 'rating',
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialFilter,

	reducers: {
		changeSearchValue(state, action) {
			state.searchValue = action.payload
		},
		changeCategoryId(state, action) {
			state.categoryId = action.payload
		},
		changeSort(state, action) {
			state.sort = action.payload
		},
		changePage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.categoryId = Number(action.payload.categoryId)
			state.currentPage = Number(action.payload.currentPage)
			state.sort = action.payload.sort
		},
	},
})


export const selectFilter = state => state.filter


export const {
	changeSearchValue,
	changeCategoryId,
	changeSort,
	changePage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
