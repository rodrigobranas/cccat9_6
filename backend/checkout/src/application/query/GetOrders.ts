import Connection from "../../infra/database/Connection";

export default class GetOrders {

	constructor (readonly connection: Connection) {
	}

	async execute () {
		const ordersData = await this.connection.query("select * from cccat9.orders", []);
		for (const orderData of ordersData) {
			orderData.items = await this.connection.query("select * from cccat9.item i join cccat9.product p using (id_product) where id_order = $1", [orderData.id_order]);
		}
		return ordersData;
	}
}
