import { MovingAverage } from "algorithm/MovingAverage";
import { Algorithm } from "algorithm/AlgorithmModule";

export
class Breakout extends Algorithm {
	movingAverage:	MovingAverage;

	constructor(length: number, baseTime: number, receiver: Function) {
		super(receiver);
		this.movingAverage = new MovingAverage(length, 1, this.check);
	}

	setLastPrice(price: number): void {
		super.setLastPrice(price);
		this.movingAverage.setLastPrice(price);
	}

	check(currMvAvg: number): void {
		let pastMvAvg: number = this.movingAverage.getPastMvAvg(1);
		let pastPrice: number = this.movingAverage.getPastPrice(1);
		let curr: boolean = currMvAvg < this.lastPrice;
		let past: boolean = pastMvAvg > pastPrice;
		if (curr === true && past === true) {
			this.receiver(1);
		} else if (curr === false && past === false) {
			this.receiver(0);
		}
	}

}
