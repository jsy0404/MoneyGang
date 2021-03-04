"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breakout = void 0;
const MovingAverage_1 = require("algorithm/MovingAverage");
const AlgorithmModule_1 = require("algorithm/AlgorithmModule");
class Breakout extends AlgorithmModule_1.Algorithm {
    constructor(length, baseTime, receiver) {
        super(receiver);
        this.movingAverage = new MovingAverage_1.MovingAverage(length, 1, this.check);
    }
    setLastPrice(price) {
        super.setLastPrice(price);
        this.movingAverage.setLastPrice(price);
    }
    check(currMvAvg) {
        let pastMvAvg = this.movingAverage.getPastMvAvg(1);
        let pastPrice = this.movingAverage.getPastPrice(1);
        let curr = currMvAvg < this.lastPrice;
        let past = pastMvAvg > pastPrice;
        if (curr === true && past === true) {
            this.receiver(1);
        }
        else if (curr === false && past === false) {
            this.receiver(0);
        }
    }
}
exports.Breakout = Breakout;
