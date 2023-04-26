export const getTotalPrice = items => {
	return items.reduce(
		(sum, itemPizza) => itemPizza.price * itemPizza.count + sum,
		0
	)
}
