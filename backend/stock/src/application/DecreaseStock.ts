import StockEntry from "../domain/entities/StockEntry";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export default class DecreaseStock {

	constructor (readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (input: Input): Promise<void> {
		console.log("decreaseStock", new Date());
		for (const item of input.items) {
			await this.stockEntryRepository.save(new StockEntry(item.idProduct, "out", item.quantity));
		}
	}
}

type Input = {
	items: { idProduct: number, quantity: number }[]
}