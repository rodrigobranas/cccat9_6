import Order from "../entities/Order";

export default interface OrderData {
	save (order: Order): Promise<void>;
	getByCpf (cpf: string): Promise<any>;
	getAll (): Promise<Order[]>;
	count (): Promise<number>;
	clean (): Promise<void>;
}
