import { Algorithm } from "algorithm/AlgorithmModule";

export
class MovingAverage extends Algorithm {
	mvAvg:				number;
	length:				number;
	mvAvgList:			Array<number>;
	recentPriceList:	Array<number>;

	constructor(length: number, baseTime: number, receiver: Function) {
		super(receiver);
		this.mvAvg = 0;
		this.lastPrice = 0;
		this.length = length;
		this.receiver = receiver;
		this.mvAvgList = new Array<number>();
		this.recentPriceList = new Array<number>();
		setInterval(() => {
			this.pushPrice(this.lastPrice);
		}, baseTime*1000);
	}

	pushPrice(price: number): void {
		let normalizedPrice: number = price/this.length;

		this.recentPriceList.push(price);
		this.mvAvg += normalizedPrice;

		if (this.recentPriceList.length > this.length) {
			this.mvAvg -= this.recentPriceList.shift()!/this.length;
			this.mvAvgList.push(this.mvAvg);
			this.mvAvgList.shift();
		}

		return;
	}

	getPastMvAvg(index: number = 0): number {
		if (index >= this.mvAvgList.length) {
			return -1;
		}
		let mvAvg: number = this.mvAvgList[this.mvAvgList.length-index-1];
		return mvAvg;
	}

	getPastPrice(index: number = 0): number {
		if (index >= this.recentPriceList.length) {
			return -1;
		}

		let price: number = this.recentPriceList[this.recentPriceList.length-index-1];
		return price;
	}
}
