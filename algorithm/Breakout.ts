import { MovingAverage } from "algorithm/MovingAverage";

export
class Breakout {
	movingAverage: MovingAverage;
	sendSignal: Function;
	lastPrice: number;

	constructor(length: number, baseTime: number, sendSignal: Function) {
		this.lastPrice = 0;
		this.sendSignal = sendSignal;
		this.movingAverage = new MovingAverage(length);
		setInterval(() => {
			this.pushPeriodic();
		}, baseTime*1000);
	}

	async pushPeriodic() {
		let price: number = this.lastPrice;
		this.movingAverage.pushPrice(price);
	}

	pushPrice(price: number): void {
		this.lastPrice = price;
		let opCode: number = this.check();
		console.log("Breakout: " + opCode);
		if (opCode != -1) {
			this.sendSignal(opCode);
		}

	}

	check(): number {
		let pastMvAvg: number = this.movingAverage.getPastMvAvg(1);
		let pastPrice: number = this.movingAverage.getPastPrice(1);
		let currMvAvg: number = this.movingAverage.getPastMvAvg(0);
		let curr: boolean = currMvAvg < this.lastPrice;
		let past: boolean = pastMvAvg > pastPrice;
		if (curr === true && past === true) {
			return 1;
		} else if (curr === false && past === false) {
			return 0;
		}
		return -1;
	}

}
