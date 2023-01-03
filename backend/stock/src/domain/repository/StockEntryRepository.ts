import StockEntry from "../entities/StockEntry";

export default interface StockEntryRepository {
	save (stockEntry: StockEntry): Promise<void>;
	getByIdProduct (idProduct: number): Promise<StockEntry[]>;
	clean (): Promise<void>;
}
