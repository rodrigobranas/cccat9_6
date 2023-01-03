import axios from "axios";
import StockGateway from "./StockGateway";

export default class StockGatewayHttp implements StockGateway {

	async decreaseStock(input: { items: { idProduct: number; quantity: number; }[]; }): Promise<void> {
		await axios.post("http://localhost:3003/decreaseStock", input);
	}

}