export default interface UseCase {
	execute (input: Input): Promise<Output>;
}

type Input = {
	from?: string,
	to?: string,
	items: { volume: number, density: number, quantity: number }[]
}

type Output = {
	total: number
}