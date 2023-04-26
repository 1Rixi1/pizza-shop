import { getTotalPrice } from './getTotalPrice'

export const getItemsCarsLS = () => {
	const data = localStorage.getItem('cartItems')

	const items = JSON.parse(data)

	const totalPrice = getTotalPrice(items)

	return { items, totalPrice }
}
