import StockEntryRepository from "../domain/repository/StockEntryRepository";

export default class CleanStock {

	constructor (readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (): Promise<void> {
		await this.stockEntryRepository.clean();
	}
}
