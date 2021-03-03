"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Breakout = void 0;
const MovingAverage_1 = require("algorithm/MovingAverage");
class Breakout {
    constructor(length, baseTime, sendSignal) {
        this.lastPrice = 0;
        this.sendSignal = sendSignal;
        this.movingAverage = new MovingAverage_1.MovingAverage(length);
        setInterval(() => {
            this.pushPeriodic();
        }, baseTime * 1000);
    }
    pushPeriodic() {
        return __awaiter(this, void 0, void 0, function* () {
            let price = this.lastPrice;
            this.movingAverage.pushPrice(price);
        });
    }
    pushPrice(price) {
        this.lastPrice = price;
        let opCode = this.check();
        console.log("Breakout: " + opCode);
        if (opCode != -1) {
            this.sendSignal(opCode);
        }
    }
    check() {
        let pastMvAvg = this.movingAverage.getPastMvAvg(1);
        let pastPrice = this.movingAverage.getPastPrice(1);
        let currMvAvg = this.movingAverage.getPastMvAvg(0);
        let curr = currMvAvg < this.lastPrice;
        let past = pastMvAvg > pastPrice;
        if (curr === true && past === true) {
            return 1;
        }
        else if (curr === false && past === false) {
            return 0;
        }
        return -1;
    }
}
exports.Breakout = Breakout;
