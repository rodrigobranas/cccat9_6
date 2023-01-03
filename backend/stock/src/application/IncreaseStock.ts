import StockEntry from "../domain/entities/StockEntry";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export default class IncreaseStock {

	constructor (readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (input: Input): Promise<void> {
		for (const item of input.items) {
			await this.stockEntryRepository.save(new StockEntry(item.idProduct, "in", item.quantity));
		}
	}
}

type Input = {
	items: { idProduct: number, quantity: number }[]
}