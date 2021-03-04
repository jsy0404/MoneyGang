"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingAverage = void 0;
const AlgorithmModule_1 = require("algorithm/AlgorithmModule");
class MovingAverage extends AlgorithmModule_1.Algorithm {
    constructor(length, baseTime, receiver) {
        super(receiver);
        this.mvAvg = 0;
        this.lastPrice = 0;
        this.length = length;
        this.receiver = receiver;
        this.mvAvgList = new Array();
        this.recentPriceList = new Array();
        setInterval(() => {
            this.pushPrice(this.lastPrice);
        }, baseTime * 1000);
    }
    pushPrice(price) {
        let normalizedPrice = price / this.length;
        this.recentPriceList.push(price);
        this.mvAvg += normalizedPrice;
        if (this.recentPriceList.length > this.length) {
            this.mvAvg -= this.recentPriceList.shift() / this.length;
            this.mvAvgList.push(this.mvAvg);
            this.mvAvgList.shift();
        }
        return;
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
