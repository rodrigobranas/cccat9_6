import StockEntry from "../../domain/entities/StockEntry";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Connection from "../database/Connection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (readonly connection: Connection) {
	}

	async save(stockEntry: StockEntry): Promise<void> {
		await this.connection.query("insert into cccat9.stock_entry (id_product, operation, quantity) values ($1, $2, $3)", [stockEntry.idProduct, stockEntry.operation, stockEntry.quantity]);
	}

	async getByIdProduct(idProduct: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.connection.query("select * from cccat9.stock_entry where id_product = $1", [idProduct]);
		const stockEntries: StockEntry[] = [];
		for (const stockEntryData of stockEntriesData) {
			stockEntries.push(new StockEntry(stockEntryData.id_product, stockEntryData.operation, stockEntryData.quantity));
		}
		return stockEntries;
	}

	async clean(): Promise<void> {
		await this.connection.query("delete from cccat9.stock_entry", []);
	}

}