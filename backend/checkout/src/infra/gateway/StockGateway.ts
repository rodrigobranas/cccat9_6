export default interface StockGateway {
	decreaseStock (input: Input): Promise<void>;
}

type Input = {
	items: { idProduct: number, quantity: number}[]
}
