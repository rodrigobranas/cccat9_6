import UseCase from "./UseCase";

export default class AuthorizationUseCase implements UseCase {

	constructor (readonly useCase: UseCase) {
	}
	
	execute(input: { from?: string | undefined; to?: string | undefined; items: { volume: number; density: number; quantity: number; }[]; }): Promise<{ total: number; }> {
		console.log(input);
		return this.useCase.execute(input);
	}

}