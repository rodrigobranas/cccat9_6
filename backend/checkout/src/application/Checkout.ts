import CouponData from "../domain/data/CouponData";
import CurrencyGatewayRandom from "../infra/gateway/CurrencyGatewayRandom";
import CurrencyGateway from "../infra/gateway/CurrencyGatewayRandom";
import Mailer from "../infra/mailer/Mailer";
import MailerConsole from "../infra/mailer/MailerConsole";
import Order from "../domain/entities/Order";
import OrderData from "../domain/data/OrderData";
import FreightGateway from "../infra/gateway/FreightGateway";
import CatalogGateway from "../infra/gateway/CatalogGateway";
import StockGateway from "../infra/gateway/StockGateway";
import Queue from "../infra/queue/Queue";
import QueueMemory from "../infra/queue/QueueMemory";

export default class Checkout {

	constructor (
		readonly catalogGateway: CatalogGateway,
		readonly couponData: CouponData,
		readonly orderData: OrderData,
		readonly freightGateway: FreightGateway,
		readonly stockGateway: StockGateway,
		readonly queue: Queue = new QueueMemory(),
		readonly currencyGateway: CurrencyGateway = new CurrencyGatewayRandom()
	) {
	}

	async execute (input: Input) {
		const currencies = await this.currencyGateway.getCurrencies();
		const order = new Order(input.cpf);
		const freightItems: { volume: number, density: number, quantity: number }[] = [];
		for (const item of input.items) {
			const product = await this.catalogGateway.getProduct(item.idProduct);
			order.addItem(product, item.quantity, product.currency, currencies.getCurrency(product.currency));
			freightItems.push({ volume: product.getVolume(), density: product.getDensity(), quantity: item.quantity });
		}
		const freight = await this.freightGateway.calculateFreight(freightItems, input.from, input.to);
		order.freight = freight.total;
		if (input.coupon) {
			const coupon = await this.couponData.getCoupon(input.coupon);
			order.addCoupon(coupon);
		}
		await this.orderData.save(order);
		// opcao 1
		// await this.stockGateway.decreaseStock(input);
		// opcao 2
		// await this.queue.publish("decreaseStock", input);
		// opcao 3
		await this.queue.publish("orderPlaced", input);
		return {
			code: order.getCode(),
			total: order.getTotal()
		};
	}
}


type Input = {
	from?: string,
	to?: string,
	cpf: string,
	email?: string,
	items: { idProduct: number, quantity: number }[],
	coupon?: string
};
