import StockCalculator from "../domain/entities/StockCalculator";
import StockEntryRepository from "../domain/repository/StockEntryRepository";

export default class CalculateStock {

	constructor (readonly stockEntryRepository: StockEntryRepository) {
	}

	async execute (idProduct: number): Promise<Output> {
		const stockEntries = await this.stockEntryRepository.getByIdProduct(idProduct);
		const total = StockCalculator.calculate(stockEntries);
		return {
			total
		};
	}
}

type Output = {
	total: number
}
