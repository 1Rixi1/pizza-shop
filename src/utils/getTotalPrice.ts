import { ItemCartPizza } from '../redux/cart/types'

export const getTotalPrice = (items: ItemCartPizza[]) => {
	return items.reduce(
		(sum: number, itemPizza) => itemPizza.price * itemPizza.count + sum,
		0
	)
}
