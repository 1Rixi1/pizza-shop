export type fetchPizzaArgs = {
	searchPizzaName: string
	currentPage: number
	category: number
	namePropetry: string
	orderProperty: string
}

export type itemPizza = {
	id: string
	imageUrl: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	category: number
}

export enum Status {
	IDLE = 'idle',
	LOADING = 'loading',
	FULFILLED = 'fulfilled',
	ERROR = 'error',
}

export interface pizzaSliceState {
	items: itemPizza[]
	status: Status
}
