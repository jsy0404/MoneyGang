import { BitmexDriver } from "./BitmexDriver";
import { PrintDriver }  from "./PrintDriver";
import { TestDriver } from "./TestDriver";

export
class CallbackDriver{
	bitmexDriver:				BitmexDriver;
	curOrder:					boolean;
	deleteTimer:				ReturnType<typeof setTimeout> | null;
	constructor(bitmexDriver: BitmexDriver){
		let orderCall: Function = this.order;
		this.bitmexDriver = bitmexDriver;
		this.curOrder = false;
		this.deleteTimer = null;
	}

	async order(orderPrice:number, opCode: number) {
		let curPos: number = parseFloat(this.bitmexDriver.getPosition()[0]["avgCostPrice"]!);
		if (opCode === 1 && isNaN(curPos)) {
			this.curOrder = false;
			this.bitmexDriver.order(orderPrice, orderPrice, 1, true);
			this.setTimer();
		}
		if (!isNaN(curPos) && !this.curOrder) {
			this.curOrder = true;
			this.deleteTimer = null;
			this.bitmexDriver.deleteOrder();
			this.bitmexDriver.order(curPos > orderPrice ? curPos : orderPrice, curPos, 1, false);
		}
	}

	async tradeInfo(data: {[key: string]: number}) {
		let price: number = data["price"]!;
		let opCode: number;
	}

	setTimer(): void {
		if (this.deleteTimer != null) {
			clearTimeout(this.deleteTimer);
		}
		this.deleteTimer = setTimeout(() => {
			if (!this.curOrder) {
				this.bitmexDriver.deleteOrder();
			}
		}, 10000);
	}
}
