export
class TestDriver {
	Balance:	number;
	lastPrice:	number;
	division:	number;
	fee:		number;

	constructor() {
		this.Balance = 100000;
		this.division = 10;
		this.fee = 0.0005;
		this.lastPrice = 0;
	}

	getDivision(): number {
		return this.Balance/this.division;
	}

	setDivision(division: number): void {
		this.division = division;
	}

	Buy(price: number): void {
		this.lastPrice = price;
	}

	Sell(price: number): void {
		if (this.lastPrice === 0) {
			return;
		}
		this.Balance += (((price - this.lastPrice) / this.lastPrice) - this.fee) * this.getDivision();
	}

}
