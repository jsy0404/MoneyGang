"use strict";
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitmexDriver = void 0;
const sync_request_1 = __importDefault(require("sync-request"));
const crypto_1 = __importDefault(require("crypto"));
const bitmex_realtime_api_1 = __importDefault(require("bitmex-realtime-api"));
const CallbackDriver_1 = require("driver/CallbackDriver");
const configure_json_1 = require("./configure.json");
class BitmexDriver {
    constructor() {
        this.getVerb = "GET";
        this.postVerb = "POST";
        this.deleteVerb = "DELETE";
        this.orderPath = "/api/v1/order";
        this.positionPath = "/api/v1/position";
        this.deletePath = "/api/v1/order/all";
        this.baseUrl = "https://www.bitmex.com";
        let bitmexDriver = this;
        this.callbackDriver = new CallbackDriver_1.CallbackDriver(bitmexDriver);
        this.bitmexClient = new bitmex_realtime_api_1.default({ apiKeyID: configure_json_1.API_KEY, apiKeySecret: configure_json_1.API_SECRET });
        this.bitmexClient.addStream("XBTUSD", "trade", (data) => {
            this.callbackDriver.tradeInfo(data[data.length - 1]);
        });
        this.bitmexClient.addStream("XBTUSD", "order", (data) => {
            if (data.length < 1) {
                return;
            }
            let col = data[data.length - 1];
            let side = col["side"];
            let stat = col["ordStatus"];
            console.log(data);
            if (stat === "filled") {
                this.callbackDriver.setOrderFinished(side);
            }
        });
        /*
        this.bitmexClient.addStream("XBTUSD", "orderBookL2_25", (data: []) => {
            this.callbackDriver.orderBookInfo(data);
        });
        */
        this.headers = {
            "content-type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "api-expires": "",
            "api-key": configure_json_1.API_KEY,
            "api-signature": ""
        };
        this.buyOrder = {
            symbol: "XBTUSD",
            orderQty: 1,
            price: 1,
            side: "Buy",
            ordType: "Limit",
            execInst: "ParticipateDoNotInitiate"
        };
        this.sellOrder = {
            symbol: "XBTUSD",
            orderQty: 1,
            side: "Sell",
            ordType: "Market"
        };
        this.query = "?symbol=XBT&reverse=true&count=1";
    }
    order(quotePrice, stopPrice, quoteAmt, orderType) {
        this.buyOrder.orderQty = quoteAmt;
        if (orderType) {
            this.buyOrder.price = quotePrice - 0.5;
            this.buyOrder.side = "Buy";
        }
        else {
            this.buyOrder.price = quotePrice + 0.5;
            this.buyOrder.side = "Sell";
        }
        return this.sendRequest(this.orderPath, this.postVerb, this.buyOrder);
    }
    deleteOrder() {
        return this.sendRequest(this.deletePath, this.deleteVerb, {});
    }
    getPosition() {
        return this.sendRequest(this.positionPath, this.getVerb, {});
    }
    getOrder() {
        return this.sendRequest(this.orderPath + this.query, this.getVerb, {});
    }
    sendRequest(path, verb, data) {
        let body = JSON.stringify(data);
        let expires = (Math.round(new Date().getTime() / 1000) + 60).toString();
        let signatureUpdate = verb + path + expires;
        let requestMessage = {};
        if (verb === "POST") {
            signatureUpdate += body;
            requestMessage["body"] = body;
        }
        let signature = crypto_1.default.createHmac("sha256", configure_json_1.API_SECRET)
            .update(signatureUpdate)
            .digest("hex");
        this.headers["api-expires"] = expires;
        this.headers["api-signature"] = signature;
        requestMessage["headers"] = this.headers;
        return JSON.parse(sync_request_1.default(verb, this.baseUrl + path, requestMessage).getBody("utf8"));
    }
}
exports.BitmexDriver = BitmexDriver;
