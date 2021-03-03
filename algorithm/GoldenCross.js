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
exports.GoldenCross = void 0;
const MovingAverage_1 = require("algorithm/MovingAverage");
class GoldenCross {
    constructor(short_length, long_length, shortBaseTime, longBaseTime, sendSignal) {
        this.shortMovingAvg = new MovingAverage_1.MovingAverage(short_length);
        this.longMovingAvg = new MovingAverage_1.MovingAverage(long_length);
        setInterval(() => {
        }, shortBaseTime * 1000);
        setInterval(() => {
        }, longBaseTime * 1000);
    }
    pushPeriodic() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.GoldenCross = GoldenCross;
