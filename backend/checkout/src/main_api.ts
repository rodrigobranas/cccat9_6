import Checkout from "./application/Checkout";
import RestController from "./infra/controller/RestController";
import CouponDataDatabase from "./infra/data/CouponDataDatabase";
import OrderDataDatabase from "./infra/data/OrderDataDatabase";
import ProductDataDatabase from "./infra/data/ProductDataDatabase";
import PgPromiseConnection from "./infra/database/PgPromiseConnection";
import CatalogGatewayHttp from "./infra/gateway/CatalogGatewayHttp";
import FreightGatewayHttp from "./infra/gateway/FreightGatewayHttp";
import StockGatewayHttp from "./infra/gateway/StockGatewayHttp";
import ExpressHttpServer from "./infra/http/ExpressHttpServer";
import QueueController from "./infra/queue/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

async function main () {
	const connection = new PgPromiseConnection();
	const httpServer = new ExpressHttpServer();
	const productData = new ProductDataDatabase(connection);
	const couponData = new CouponDataDatabase(connection);
	const orderData = new OrderDataDatabase(connection);
	const freightGateway = new FreightGatewayHttp();
	const catalogGateway = new CatalogGatewayHttp();
	const stockGateway = new StockGatewayHttp();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const checkout = new Checkout(catalogGateway, couponData, orderData, freightGateway, stockGateway, queue);
	new RestController(httpServer, checkout, queue);
	new QueueController(queue, checkout);
	httpServer.listen(3000);
}

main();
