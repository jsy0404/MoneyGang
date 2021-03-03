import pymongo
import pandas as pd

class company_data:
    """company_data."""

    def __init__(self) -> None:
        """__init__.

        Make a connection with database.
        Create inner variable with stock_type.
        :rtype: None
        """
        host_info = open("host.txt", "r")
        host, port = host_info.readlines()
        self.connection = pymongo.MongoClient("mongodb://" + host, int(port))
        self.db = self.connection.yjs
        self.kospi_col = self.db.kospi
        self.kosdaq_col = self.db.kosdaq
        self.stock_type = {
            "kospi": {"market_type": "stockMkt", "code": "KS"},
            "kosdaq": {"market_type": "kosdaqMkt", "code": "KQ"},
        }
        host_info.close()
        return None

    def __del__(self) -> None:
        """__del__.

        Disconnect with database.
        :rtype: None
        """
        self.connection.close()
        return None

    def __crawling_stock(self, stock_type: str) -> pd.DataFrame:
        """__crawling_stock.

        Crawling companies from krx.
        :param stock_type: Want to crawling. "kospi"/"kosdaq"
        :type stock_type: str
        :rtype: pd.DataFrame
        """
        market_type = self.stock_type[stock_type]["market_type"]
        download_link = "http://kind.krx.co.kr/corpgeneral/corpList.do"
        download_link = download_link + "?method=download"
        download_link = download_link + "&marketType=" + market_type
        df = pd.read_html(download_link, header=0)[0]
        return df

    def __get_download(self, stock_type: str) -> pd.DataFrame:
        """__get_download.

        Download specific market datas.
        :param stock_type: Want to download. "kospi"/"kosdaq"
        :type stock_type: str
        :rtype: pd.DataFrame
        """
        code = self.stock_type[stock_type]["code"]
        df = self.__crawling_stock(stock_type)
        df.종목코드 = df.종목코드.map(("{:06d}." + code).format)
        return df

    def __df_to_json(self, data: pd.DataFrame) -> list:
        """__df_to_json.

        Convert dataframe to json.
        :param data: Want to convert.
        """
        bson = []
        for code in data["code"]:
            body = {}
            line = data.loc[data["code"] == code]
            body["code"] = code
            body["name"] = line["name"].to_string().split()[1]
            body["list_date"] = line["list_date"].to_string().split()[1]
            bson.append(body)
        return bson

    def __rename_df(self, data: pd.DataFrame) -> pd.DataFrame:
        """__rename_df.

        Rename dataframe column kor to eng.
        :param data: Want to rename
        :type data: pd.DataFrame
        :rtype: pd.DataFrame
        """
        compaction = data.loc[:, ["회사명", "종목코드", "상장일"]]
        columns = {"회사명": "name", "종목코드": "code", "상장일": "list_date"}
        renamed = compaction.rename(columns=columns)
        return renamed

    def __refresh_col(self, market_name: str) -> None:
        """__refresh_col.

        Refresh database if datas were not exist or crashed.
        :param market_name: Want to refresh. "kospi"/"kosdaq"
        :type market_name: str
        :rtype: None
        """
        if market_name == "kospi":
            col = self.kospi_col
        elif market_name == "kosdaq":
            col = self.kosdaq_col
        if col.count() < 1000:
            col.delete_many({})
            df = self.__get_download(market_name)
            renamed = self.__rename_df(df)
            market_json = self.__df_to_json(renamed)
            col.insert(market_json)
            return True
        return False

    def get_company_list(self) -> list:
        """get_company_list.

        Get all companies listed at kospi&kosdaq.
        :rtype: list
        """
        self.__get_download("kospi")
        self.__refresh_col("kospi")
        self.__refresh_col("kosdaq")
        kospi = [{j: i[j] for j in i if j != "_id"} for i in self.kospi_col.find({})]
        kosdaq = [{j: i[j] for j in i if j != "_id"} for i in self.kosdaq_col.find({})]
        return kospi, kosdaq
