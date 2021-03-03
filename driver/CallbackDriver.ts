import { BitmexDriver } from "driver/BitmexDriver";

export
class CallbackDriver{
	bitmexDriver:	BitmexDriver;
	deleteTimer:	ReturnType<typeof setTimeout> | null;
	buyFilled:		boolean;
	sellFilled:		boolean;
	constructor(bitmexDriver: BitmexDriver){
		let orderCall: Function = this.order;
		this.bitmexDriver = bitmexDriver;
		this.deleteTimer = null;
		this.buyFilled = true;
		this.sellFilled = true;
	}

	async order(orderPrice:number, opCode: number) {
		let curPos: number = parseFloat(this.bitmexDriver.getPosition()[0]["avgCostPrice"]!);
		if (opCode === 1 && this.buyFilled) {
			this.buyFilled = false;
			this.bitmexDriver.order(orderPrice, orderPrice, 1, true);
			this.setDeleteOrderTimer();
		}
		if (opCode === 0 && this.sellFilled) {
			this.sellFilled = false;
			this.deleteTimer = null;
			this.bitmexDriver.deleteOrder();
			this.bitmexDriver.order(curPos > orderPrice ? curPos : orderPrice, curPos, 1, false);
		}
	}

	async tradeInfo(data: {[key: string]: number}) {
		let price: number = data["price"]!;
		let opCode: number;
	}

	setDeleteOrderTimer(): void {
		if (this.deleteTimer != null) {
			clearTimeout(this.deleteTimer);
		}
		this.deleteTimer = setTimeout(() => {
			if (!this.buyFilled) {
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
