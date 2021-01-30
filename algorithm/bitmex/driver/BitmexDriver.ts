import * as BitMEXClient from "bitmex-realtime-api";
import { CallbackDriver } from "./CallbackDriver";
import  * as fs from "fs";

export
class BitmexDriver{
	bitmexClient: BitMEXClient;
	callbackDriver: CallbackDriver;
	lastQuoteTS: String = null;

	constructor(){
		const key = this.getKey();
		this.callbackDriver = new CallbackDriver();
		this.bitmexClient = new BitMEXClient({apiKeyID: key});
		this.bitmexClient.addStream("XBTUSD", "trade", (data: []) => {
			this.callbackDriver.tradeInfo(data[data.length-1]);
		});
		this.bitmexClient.addStream("XBTUSD", "orderBookL2_25", (data: []) => {
			this.callbackDriver.orderBookInfo(data);
		});
	}

	private getKey(): string {
		const keyFile = fs.readFileSync("key.txt");
		const key = keyFile.toString().split("\n")[0];
		return key;
	}
}
