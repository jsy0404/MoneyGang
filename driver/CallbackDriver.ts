import { BitmexDriver } from "driver/BitmexDriver";

export
class CallbackDriver{
<<<<<<< HEAD
	buyFilled:		boolean;
	sellFilled:		boolean;
	bitmexDriver:	BitmexDriver;
	deleteTimer:	ReturnType<typeof setTimeout> | null;
=======
	bitmexDriver:	BitmexDriver;
	deleteTimer:	ReturnType<typeof setTimeout> | null;
	buyFilled:		boolean;
	sellFilled:		boolean;
>>>>>>> 533e12b3112a603a68ea71317e12ba5b52c28c38
	constructor(bitmexDriver: BitmexDriver){
		let orderCall: Function = this.order;
		this.bitmexDriver = bitmexDriver;
		this.deleteTimer = null;
		this.buyFilled = true;
		this.sellFilled = true;
	}

	async order(orderPrice:number, opCode: number) {
		if (opCode === 1) {
			this.buyOrder(orderPrice, 1);
		}
		if (opCode === 0) {
			let curPos: number = parseFloat(this.bitmexDriver.getPosition()[0]["avgCostPrice"]!);
			this.sellOrder(curPos > orderPrice ? curPos : orderPrice, 1);
		}
	}

	async buyOrder(price: number, amount: number) {
		if (this.buyFilled) {
			this.buyFilled = false;
			this.bitmexDriver.order(price, price, amount, true);
			this.setDeleteOrderTimer();
		}
	}

	async sellOrder(price: number, amount: number) {
		if (this.sellFilled) {
			this.sellFilled = false;
			this.deleteTimer = null;
			this.bitmexDriver.deleteOrder();
			this.bitmexDriver.order(price, price/*curPos*/, amount, false);
		}
	}

	async tradeInfo(data: {[key: string]: number}) {
		let price: number = data["price"]!;
<<<<<<< HEAD
=======
		let opCode: number;
>>>>>>> 533e12b3112a603a68ea71317e12ba5b52c28c38
	}

	setDeleteOrderTimer(): void {
		if (this.deleteTimer != null) {
			clearTimeout(this.deleteTimer);
		}
		this.deleteTimer = setTimeout(() => {
			if (!this.buyFilled) {
<<<<<<< HEAD
				this.buyFilled = true;
=======
>>>>>>> 533e12b3112a603a68ea71317e12ba5b52c28c38
				this.bitmexDriver.deleteOrder();
			}
		}, 10000);
	}

	setOrderFinished(side: string) {
		if (side === "Buy") {
			this.buyFilled = true;
		}
		else if (side === "Sell") {
			this.sellFilled = true;
		}
	}
}
