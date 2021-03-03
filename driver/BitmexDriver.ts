// @ts-ignore

import request from "sync-request";
import { Options } from "sync-request";
import { IncomingHttpHeaders } from "http";
import crypto from "crypto";
import BitMEXClient from "bitmex-realtime-api";
import { CallbackDriver } from "driver/CallbackDriver";
import { API_KEY, API_SECRET } from "./configure.json";

interface buyData  {symbol: string; orderQty: number; price: number; side: string; ordType: string; execInst: string}
interface sellData  {symbol: string; orderQty: number; side: string; ordType: string;}
interface order {side: string, ordStatus: string}
export
class BitmexDriver{
	bitmexClient:	any;// BitMEXClient;
	callbackDriver: CallbackDriver;
	getVerb:		string = "GET";
	postVerb:		string = "POST";
	deleteVerb:		string = "DELETE";
	orderPath:		string = "/api/v1/order";
	positionPath:	string = "/api/v1/position";
	deletePath:		string = "/api/v1/order/all";
	baseUrl:		string = "https://www.bitmex.com";
	headers:		IncomingHttpHeaders;
	buyOrder:		buyData;
	sellOrder:		sellData;
	query:			string;

	constructor(){
		let bitmexDriver: BitmexDriver= this;
		this.callbackDriver = new CallbackDriver(bitmexDriver);
		this.bitmexClient = new BitMEXClient({apiKeyID: API_KEY, apiKeySecret: API_SECRET});
		this.bitmexClient.addStream("XBTUSD", "trade", (data: []) => {
			this.callbackDriver.tradeInfo(data[data.length-1]);
		});
		this.bitmexClient.addStream("XBTUSD", "order", (data: []) => {
			let col: order = data[data.length-1];
			let side: string = col["side"];
			let stat: string = col["ordStatus"];
			if (stat === "filled") {
				this.bitmexClient.setOrderFinished(side);
			}
		});
		/*
		this.bitmexClient.addStream("XBTUSD", "orderBookL2_25", (data: []) => {
			this.callbackDriver.orderBookInfo(data);
		});
		*/

		this.headers = {
			"content-type": "application/json",
			"Accept" : "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"api-expires": "",
			"api-key": API_KEY,
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

	order(quotePrice: number, stopPrice: number, quoteAmt: number, orderType: boolean): Map<string, string> {
		this.buyOrder.orderQty = quoteAmt;
		if (orderType) {
			this.buyOrder.price = quotePrice-0.5;
			this.buyOrder.side = "Buy";
		} else {
			this.buyOrder.price = quotePrice+0.5;
			this.buyOrder.side = "Sell";
		}
		return this.sendRequest(this.orderPath, this.postVerb, this.buyOrder);


	}

	deleteOrder(): Map<string, string> {
		return this.sendRequest(this.deletePath, this.deleteVerb, {});
	}

	getPosition(): Array<any> {
		return this.sendRequest(this.positionPath, this.getVerb, {});
	}

	getOrder(): any {
		return this.sendRequest(this.orderPath + this.query, this.getVerb, {});
	}

	sendRequest(path: string, verb: string, data: {}): any {
		let body:  string = JSON.stringify(data);
		let expires:   string = (Math.round(new Date().getTime() / 1000) + 60).toString();
		let signatureUpdate: string = verb + path + expires;
		let requestMessage: Options = {};

		if (verb === "POST") {
			signatureUpdate += body;
			requestMessage["body"] =  body;
		}
		let signature: string = crypto.createHmac("sha256", API_SECRET)
			.update(signatureUpdate)
			.digest("hex");


		this.headers["api-expires"] = expires;
		this.headers["api-signature"] = signature;
		requestMessage["headers"] = this.headers;

		return JSON.parse(request(verb as any, this.baseUrl + path, requestMessage).getBody("utf8"));
	}
}
