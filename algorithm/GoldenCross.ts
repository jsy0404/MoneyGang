import { MovingAverage } from "algorithm/MovingAverage";
import { Algorithm } from "algorithm/AlgorithmModule";

export
class GoldenCross extends Algorithm {
	longMovingAvg:	MovingAverage;
	shortMovingAvg: MovingAverage;

	constructor(shortLength: number, longLength: number, shortBaseTime: number, longBaseTime: number, receiver: Function) {
		super(receiver);
		this.shortMovingAvg = new MovingAverage(shortLength, shortBaseTime, this.shortMvAvgChecker);
		this.longMovingAvg  = new MovingAverage(longLength, longBaseTime, this.longMvAvgChecker);
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
