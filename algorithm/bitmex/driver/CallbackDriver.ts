import { BitmexDriver } from "./BitmexDriver";
import { PrintDriver }  from "./PrintDriver";

export
class CallbackDriver{
	lastPrice:						number;
	lastValue:						number;
	quoteAmountAvg:					number;
	traceCountThreshold:			number;
	traceQuoteThreshold:			number;
	emergenceQuoteThreshold:		number;
	printDriver:			   PrintDriver;
	quoteList:		   Map<number, number>;
	orderBook:		   Map<number, number>;
	quoteBook:  Map<number, Array<number>>;

	constructor(){
		this.lastPrice = 0;
		this.lastValue = 0;
		this.quoteAmountAvg = 4;
		this.traceCountThreshold = 1;
		this.traceQuoteThreshold = 100;
		this.emergenceQuoteThreshold = 10000000;
		this.printDriver = new PrintDriver();
		this.quoteList   = new Map<number, number>();
		this.orderBook   = new Map<number, number>();
		this.quoteBook   = new Map<number, Array<number>>();
	}


	tradeInfo(data: Map<String, number>): void {
		this.lastPrice = data["price"];
		this.lastValue = data["size"];
	}


	orderBookInfo(data: []): void{
		let price: number;
		let size:  number;
		let quote:  number;
		data.forEach((row) => {
			price = row["price"];
			size = row["size"];
			if (this.orderBook.has(price)) {
				quote = Math.abs(this.orderBook.get(price)! - size);
				if (quote > this.traceQuoteThreshold) {
					this.addQuote(price, quote);
				}
			}
			this.orderBook.set(price, size);
		});
		//console.clear();
		//this.printDriver.printOrderBook(this.sortDictByKey(this.orderBook), this.lastPrice, this.lastValue);
	}


	addQuote(price: number, quote: number): void{
		let count: number;
		if (this.quoteList.has(price)) {
			this.quoteList.set(price, count+1);
			count = this.quoteList.get(price);
			if (count === this.traceCountThreshold){
				let arr: Array<number> = new Array<number>();
				arr.push(quote);
				this.quoteBook.set(price, arr);
			} else if (count > this.traceCountThreshold){
				this.quoteBook.get(price)!.push(quote);
				//console.clear();
				//this.printDriver.printOrderBook(this.sortDictByKey(this.quoteBook), price, quote);
			}
		} else {
			this.quoteList.set(price, 0);
		}
		if (this.quoteBook.size >40){
			this.resetQuoteBook();
		}
	}


	resetQuoteBook(): void{
		for (let i=0; i<10; ++i){
			let min: number = 1000;
			let key: string = "";
			let rowLength: number;
			let avg: number = 0;
			let sorted = this.sortDictByKey(this.quoteBook);
			sorted.forEach((elem: Array<any>) => {
				rowLength = elem[1].length;
				avg += rowLength;
				if (rowLength > this.quoteAmountAvg && this.quoteAmountAvg > 4){
					this.quoteBook.delete(parseFloat(elem[0]));
					this.quoteList.delete(parseFloat(elem[0]));
					return;
				}
				if (rowLength < min){
					min = rowLength;
					key = elem[0];
				}
			});

			this.quoteAmountAvg = (avg/sorted.length);
			if (Math.max(...this.quoteBook.get(parseFloat(key))!) < this.emergenceQuoteThreshold){
				this.quoteBook.delete(parseFloat(key));
				this.quoteList.delete(parseFloat(key));
			}
		}
	}


	sortDictByKey(data: Map<number, any>): any{
		let sorted: any = Array.from(data.keys()).map((key) => [key, data.get(key)]);
		sorted.sort(function(first: Array<any>, second: Array<any>) {
			return second[0] - first[0];
		});

		return sorted;
	}
}
