import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Sort, SortProperty, filterSliceState } from './types'

const initialFilter: filterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'Популярности(от большего)',
		sortProperty: SortProperty.RATING_DESC,
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialFilter,

	reducers: {
		changeSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		changeCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		changeSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload
		},
		changePage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<filterSliceState>) {
			state.categoryId = Number(action.payload.categoryId)
			state.currentPage = Number(action.payload.currentPage)
			state.sort = action.payload.sort
		},
	},
})

export const {
	changeSearchValue,
	changeCategoryId,
	changeSort,
	changePage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
