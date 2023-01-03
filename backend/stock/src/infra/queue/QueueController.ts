import DecreaseStock from "../../application/DecreaseStock";
import Queue from "./Queue";

export default class QueueController {

	constructor (readonly queue: Queue, readonly decreaseStock: DecreaseStock) {
		queue.on("orderPlaced", async function (input: any) {
			await decreaseStock.execute(input);
		});
	}
}
