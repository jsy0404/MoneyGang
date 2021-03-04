import { MovingAverage } from "algorithm/MovingAverage";
import { Algorithm } from "algorithm/AlgorithmModule";

export
class GoldenCross extends Algorithm {
	longMovingAvg:	MovingAverage;
	shortMovingAvg: MovingAverage;

	constructor(short_length: number, long_length: number, shortBaseTime: number, longBaseTime: number, receiver: Function) {
		super(receiver);
		this.shortMovingAvg = new MovingAverage(short_length, shortBaseTime, this.shortMvAvgChecker);
		this.longMovingAvg  = new MovingAverage(long_length, longBaseTime, this.longMvAvgChecker);
	}

	setLastPrice(price: number): void {
		super.setLastPrice(price);
		this.shortMovingAvg.setLastPrice(price);
		this.longMovingAvg.setLastPrice(price);
	}

	shortMvAvgChecker(mvAvg: number): void {

	}

	longMvAvgChecker(mvAvg: number): void {

	}
}
