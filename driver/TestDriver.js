"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDriver = void 0;
class TestDriver {
    constructor() {
        this.Balance = 100000;
        this.division = 10;
        this.fee = 0.0005;
        this.lastPrice = 0;
    }
    getDivision() {
        return this.Balance / this.division;
    }
    setDivision(division) {
        this.division = division;
    }
    Buy(price) {
        this.lastPrice = price;
    }
    Sell(price) {
        if (this.lastPrice === 0) {
            return;
        }
        this.Balance += (((price - this.lastPrice) / this.lastPrice) - this.fee) * this.getDivision();
    }
}
exports.TestDriver = TestDriver;
