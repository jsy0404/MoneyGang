import pandas as pd
import pandas_datareader as pdr
import os

class stock_data:
	def __init__(self):
		self.kospi_path = "./data/kospi.csv"
		self.kosdaq_path = "./data/kosdaq.csv"
		self.stock_type = {"kospi": {"market_type": "stockMkt", "code": "KS"}, "kosdaq": {"market_type": "kosdaqMkt", "code": "KQ"}}
	def __get_code(self, df, name):
		code = df.query("name=='{}'".format(name))["code"].to_string(index=False)
		code = code.strip()
		return code


	def __get_download_stock(self, stock_type):
		market_type = self.stock_type[stock_type]["market_type"]
		download_link = "http://kind.krx.co.kr/corpgeneral/corpList.do"
		download_link = download_link + "?method=download"
		download_link = download_link + "&marketType=" + market_type
		df = pd.read_html(download_link, header=0)[0]
		return df


	def __get_download(self, stock_type):
		code = self.stock_type[stock_type]["code"]
		df = self.__get_download_stock(stock_type)
		df.종목코드 = df.종목코드.map(("{:06d}."+code).format)
		return df

	def get_data(self):
		if not os.path.isfile(self.kospi_path):
			kospi_df = self.__get_download("kospi").loc[:,['회사명', '종목코드', '상장일']]
			kospi_df.to_csv(self.kospi_path)
		else:
			kospi_df = pd.read_csv(self.kospi_path)
		if not os.path.isfile(self.kosdaq_path):
			kosdaq_df = self.__get_download("kosdaq").loc[:, ['회사명', '종목코드', '상장일']]
			kosdaq_df.to_csv(self.kosdaq_path)
		else:
			kosdaq_df = pd.read_csv(self.kosdaq_path)
		code_df = pd.concat([kospi_df, kosdaq_df])
		code_df = code_df.rename(columns={"회사명": "name", "종목코드": "code", "상장일": "list_data"})
		
		return code_df
