"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingAverage = void 0;
class MovingAverage {
    constructor(length) {
        this.mvAvg = 0;
        this.length = length;
        this.recentPriceList = new Array();
        this.mvAvgList = new Array();
    }
    pushPrice(price) {
        let normalizedPrice = price / this.length;
        this.recentPriceList.push(price);
        this.mvAvg += normalizedPrice;
        if (this.recentPriceList.length < this.length + 1) {
            return;
        }
        this.mvAvg -= this.recentPriceList.shift() / this.length;
        console.log("Avg: " + this.mvAvg);
        this.mvAvgList.push(this.mvAvg);
    }
    getPastMvAvg(index = 0) {
        if (index >= this.mvAvgList.length) {
            return -1;
        }
        let mvAvg = this.mvAvgList[this.mvAvgList.length - index - 1];
        return mvAvg;
    }
    getPastPrice(index = 0) {
        if (index >= this.recentPriceList.length) {
            return -1;
        }
        let price = this.recentPriceList[this.recentPriceList.length - index - 1];
        return price;
    }
}
exports.MovingAverage = MovingAverage;
