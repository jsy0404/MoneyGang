export
abstract class Algorithm {
	lastPrice:	number;
	receiver:	Function;

	constructor(receiver: Function) {this.receiver = receiver; this.lastPrice = 0;}
	setLastPrice(price: number): void {this.lastPrice = price};
}
