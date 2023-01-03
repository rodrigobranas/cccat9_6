import CalculateStock from "../../application/CalculateStock";
import CleanStock from "../../application/CleanStock";
import DecreaseStock from "../../application/DecreaseStock";
import IncreaseStock from "../../application/IncreaseStock";
import HttpServer from "../http/HttpServer";

export default class RestController {

	constructor (httpServer: HttpServer, calculateStock: CalculateStock, increaseStock: IncreaseStock, decreaseStock: DecreaseStock, cleanStock: CleanStock) {
		httpServer.on("post", "/calculateStock", async function (params: any, body: any) {
			const output = await calculateStock.execute(body.idProduct);
			return output;
		});

		httpServer.on("post", "/increaseStock", async function (params: any, body: any) {
			await increaseStock.execute(body);
		});

		httpServer.on("post", "/decreaseStock", async function (params: any, body: any) {
			await decreaseStock.execute(body);
		});

		httpServer.on("post", "/cleanStock", async function (params: any, body: any) {
			await cleanStock.execute();
		});

	}

}
