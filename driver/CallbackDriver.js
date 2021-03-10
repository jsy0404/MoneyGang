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
exports.CallbackDriver = void 0;
class CallbackDriver {
    constructor(bitmexDriver) {
        let orderCall = this.order;
        this.bitmexDriver = bitmexDriver;
        this.deleteTimer = null;
        this.buyFilled = true;
        this.sellFilled = true;
    }
    order(orderPrice, opCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (opCode === 1) {
                this.buyOrder(orderPrice, 1);
            }
            if (opCode === 0) {
                let curPos = parseFloat(this.bitmexDriver.getPosition()[0]["avgCostPrice"]);
                this.sellOrder(curPos > orderPrice ? curPos : orderPrice, 1);
            }
        });
    }
    buyOrder(price, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.buyFilled) {
                this.buyFilled = false;
                this.bitmexDriver.order(price, price, amount, true);
                this.setDeleteOrderTimer();
            }
        });
    }
    sellOrder(price, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.sellFilled) {
                this.sellFilled = false;
                this.deleteTimer = null;
                this.bitmexDriver.deleteOrder();
                this.bitmexDriver.order(price, price /*curPos*/, amount, false);
            }
        });
    }
    tradeInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let price = data["price"];
        });
    }
    setDeleteOrderTimer() {
        if (this.deleteTimer != null) {
            clearTimeout(this.deleteTimer);
        }
        this.deleteTimer = setTimeout(() => {
            if (!this.buyFilled) {
                this.buyFilled = true;
                this.bitmexDriver.deleteOrder();
            }
        }, 10000);
    }
    setOrderFinished(side) {
        if (side === "Buy") {
            this.buyFilled = true;
        }
        else if (side === "Sell") {
            this.sellFilled = true;
        }
    }
}
exports.CallbackDriver = CallbackDriver;
