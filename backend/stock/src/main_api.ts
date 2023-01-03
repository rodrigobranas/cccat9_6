import CalculateStock from "./application/CalculateStock";
import CleanStock from "./application/CleanStock";
import DecreaseStock from "./application/DecreaseStock";
import IncreaseStock from "./application/IncreaseStock";
import RestController from "./infra/controller/RestController";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import QueueController from "./infra/queue/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import StockEntryRepositoryDatabase from "./infra/repository/StockEntryRepositoryDatabase";

async function main () {
	const connection = new PgPromiseConnection();
	const httpServer = new ExpressHttpServer();
	const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
	const calculateStock = new CalculateStock(stockEntryRepository);
	const increaseStock = new IncreaseStock(stockEntryRepository);
	const decreaseStock = new DecreaseStock(stockEntryRepository);
	const cleanStock = new CleanStock(stockEntryRepository);
	new RestController(httpServer, calculateStock, increaseStock, decreaseStock, cleanStock);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new QueueController(queue, decreaseStock);
	httpServer.listen(3003);
}

main();