import { MovingAverage } from "algorithm/MovingAverage";

export
class GoldenCross {
	longMovingAvg:	MovingAverage;
	shortMovingAvg: MovingAverage;

	constructor(short_length: number, long_length: number, shortBaseTime: number, longBaseTime: number, sendSignal: Function) {
		this.shortMovingAvg = new MovingAverage(short_length);
		this.longMovingAvg  = new MovingAverage(long_length);

		setInterval(() => {

		}, shortBaseTime*1000);

		setInterval(() => {

		}, longBaseTime*1000);
	}

	async pushPeriodic() {

	}
}
