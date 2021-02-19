// @ts-ignore

import request from "sync-request";
import { Options } from "sync-request";
import { IncomingHttpHeaders } from "http";
import crypto from "crypto";
import BitMEXClient from "bitmex-realtime-api";
import { CallbackDriver } from "driver/CallbackDriver";
import { API_KEY, API_SECRET } from "./configure.json"

interface buyData  {symbol: string; orderQty: number; price: number; side: string; ordType: string; execInst: string};
interface sellData  {symbol: string; orderQty: number; side: string; ordType: string;};

export
class BitmexDriver{
	bitmexClient:	any;// BitMEXClient;
	callbackDriver: CallbackDriver;
	get_verb:		string = "GET";
	post_verb:		string = "POST";
	delete_verb:	string = "DELETE";
	order_path:		string = "/api/v1/order";
	position_path:	string = "/api/v1/position";
	delete_path:	string = "/api/v1/order/all";
	base_url:		string = "https://www.bitmex.com";
	headers:		IncomingHttpHeaders;
	buyOrder:		buyData;
	sellOrder:		sellData;
	query:			string;

	constructor(){
		let bitmexDriver: BitmexDriver= this;
		this.callbackDriver = new CallbackDriver(bitmexDriver);
		this.bitmexClient = new BitMEXClient({apiKeyID: API_KEY});
		this.bitmexClient.addStream("XBTUSD", "trade", (data: []) => {
			this.callbackDriver.tradeInfo(data[data.length-1]);
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

	Order(quotePrice: number, stopPrice: number, quoteAmt: number, orderType: boolean): Map<string, string> {
		this.buyOrder.orderQty = quoteAmt;
		if (orderType) {
			this.buyOrder.price = quotePrice-0.5;
			this.buyOrder.side = "Buy";
		} else {
			this.buyOrder.price = quotePrice+0.5;
			this.buyOrder.side = "Sell";
		}
		return this.sendRequest(this.order_path, this.post_verb, this.buyOrder);


	}

	deleteOrder(): Map<string, string> {
		return this.sendRequest(this.delete_path, this.delete_verb, {});
	}

	getPosition(): Array<any> {
		return this.sendRequest(this.position_path, this.get_verb, {});
	}

	getOrder(): any {
		return this.sendRequest(this.order_path + this.query, this.get_verb, {});
	}

	sendRequest(path: string, verb: string, data: {}): any {
		let body:  string = JSON.stringify(data);
		let expires:   string = (Math.round(new Date().getTime() / 1000) + 60).toString();
		let signature_update: string = verb + path + expires;
		let request_message: Options = {};

		if (verb == "POST") {
			signature_update += body;
			request_message["body"] =  body;
		}
		let signature: string = crypto.createHmac("sha256", API_SECRET)
			.update(signature_update)
			.digest("hex");


		this.headers["api-expires"] = expires;
		this.headers["api-signature"] = signature;
		request_message["headers"] = this.headers;

		return JSON.parse(request(verb as any, this.base_url + path, request_message).getBody("utf8"));
	}
}
