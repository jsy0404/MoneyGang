export
class OrderbookDriver{
	quoteAmountAvg:				number;
	traceCountThreshold:		number;
	traceQuoteThreshold:		number;
	emergenceQuoteThreshold:	number;
	quoteList:					Map<number, number>;
	orderBook:					Map<number, number>;
	quoteBook:					Map<number, Array<number>>;
	constructor(){
		this.quoteAmountAvg = 4;
		this.traceCountThreshold = 1;
		this.traceQuoteThreshold = 100;
		this.emergenceQuoteThreshold = 1000000;
		this.quoteList   = new Map<number, number>();
		this.orderBook   = new Map<number, number>();
		this.quoteBook   = new Map<number, Array<number>>();
	}

	orderBookInfo(data: Array<{[key: string]: number}>): void{
		let price: number;
		let size:  number;
		let quote:  number;
		data.forEach((row) => {
			price = row["price"]!;
			size = row["size"]!;
			if (this.orderBook.has(price)) {
				quote = Math.abs(this.orderBook.get(price)! - size);
				if (quote > this.traceQuoteThreshold) {
					this.addQuote(price, quote);
				}
			}
			this.orderBook.set(price, size);
		});
	}


	addQuote(price: number, quote: number): void{
		let count: number;
		if (this.quoteList.has(price)) {
			count = this.quoteList.get(price)!;
			this.quoteList.set(price, count+1);
			if (count === this.traceCountThreshold){
				let arr: Array<number> = new Array<number>();
				arr.push(quote);
				this.quoteBook.set(price, arr);
			} else if (count > this.traceCountThreshold){
				this.quoteBook.get(price)!.push(quote);
			}
		} else {
			this.quoteList.set(price, 0);
		}
		this.resetQuoteBook();
	}


	resetQuoteBook(): void{
		if (this.quoteBook.size > 40){
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
	}


	sortDictByKey(data: Map<number, any>): any{
		let sorted: any = Array.from(data.keys()).map((key) => [key, data.get(key)]);
		sorted.sort(function(first: Array<any>, second: Array<any>) {
			return second[0] - first[0];
		});

		return sorted;
	}
}
