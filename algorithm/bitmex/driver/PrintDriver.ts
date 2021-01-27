export
class PrintDriver{
	background: String = "\x1b[47m";


	printOrderBook(book: any, price: number, value: number): void{
		//console.clear();
		book.forEach((elem) => {
			let color: String;
			let msg: String;
			let tradePrice: boolean = (elem[0] === price);
			
			msg = this.formatting(elem, value, tradePrice);
			color = this.getColor(tradePrice);
			
			//console.log(color, msg, this.background);
		});
	}


	getColor(coloring: boolean): String{
		if (coloring) { return "\x1b[31m"; }
		return "\x1b[30m";
	}


	formatting(row: number[], value: number, printValue: boolean): String{
		let msg: String;
		msg = row[0].toString().padEnd(10);
		msg += ",";
		msg += row[1].toString().padEnd(10);
		if (printValue) {
			msg += value.toString().padStart(10);
		}

		return msg;
	}
}
