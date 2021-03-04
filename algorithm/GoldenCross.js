"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldenCross = void 0;
const MovingAverage_1 = require("algorithm/MovingAverage");
const AlgorithmModule_1 = require("algorithm/AlgorithmModule");
class GoldenCross extends AlgorithmModule_1.Algorithm {
    constructor(short_length, long_length, shortBaseTime, longBaseTime, receiver) {
        super(receiver);
        this.shortMovingAvg = new MovingAverage_1.MovingAverage(short_length, shortBaseTime, this.shortMvAvgChecker);
        this.longMovingAvg = new MovingAverage_1.MovingAverage(long_length, longBaseTime, this.longMvAvgChecker);
    }
    setLastPrice(price) {
        super.setLastPrice(price);
        this.shortMovingAvg.setLastPrice(price);
        this.longMovingAvg.setLastPrice(price);
    }
    shortMvAvgChecker(mvAvg) {
    }
    longMvAvgChecker(mvAvg) {
    }
}
exports.GoldenCross = GoldenCross;
