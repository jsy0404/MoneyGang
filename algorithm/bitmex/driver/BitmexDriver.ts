import * as BitMEXClient from "bitmex-realtime-api";
import { CallbackDriver } from "./CallbackDriver";
import  * as fs from "fs";

export
class BitmexDriver{
	BitmexClient: typeof BitMEXClient;
	lastQuoteTS: String = null;

	constructor(callbackDriver: CallbackDriver){
		const key = this.getKey();
		this.BitmexClient = new BitMEXClient({apiKeyID: key});
		this.BitmexClient.addStream("XBTUSD", "trade", (data: []) => {
			callbackDriver.tradeInfo(data[data.length-1]);
		});
		this.BitmexClient.addStream("XBTUSD", "orderBookL2_25", (data: []) => {
			callbackDriver.orderBookInfo(data);
		});
	}

	private getKey(): string {
		const keyFile = fs.readFileSync("key.txt");
		const key = keyFile.toString().split("\n")[0];
		return key;
	}
}
