export type ItemCartPizza = {
	title: string
	imageUrl: string
	type: string
	size: number
	price: number
	id: string
	count: number
}

export interface cartSliceState {
	totalPrice: number
	items: ItemCartPizza[]
}
