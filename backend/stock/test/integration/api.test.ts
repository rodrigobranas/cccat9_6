import axios from "axios";

test("Deve testar a api de estoque", async function () {
	await axios.post("http://localhost:3003/cleanStock");
	const response1 = await axios.post("http://localhost:3003/calculateStock", { idProduct: 1 });
	const output1 = response1.data;
	expect(output1.total).toBe(0);
	const input1 = {
		items: [
			{ idProduct: 1, quantity: 10 }
		]
	};
	await axios.post("http://localhost:3003/increaseStock", input1);
	const response2 = await axios.post("http://localhost:3003/calculateStock", { idProduct: 1 });
	const output2 = response2.data;
	expect(output2.total).toBe(10);
	const input2 = {
		items: [
			{ idProduct: 1, quantity: 2 }
		]
	};
	await axios.post("http://localhost:3003/decreaseStock", input2);
	const response3 = await axios.post("http://localhost:3003/calculateStock", { idProduct: 1 });
	const output3 = response3.data;
	expect(output3.total).toBe(8);
});
