import requests

from .tempData import get_temp_data

API_KEY = "8M5ZH1341932VVOE"


def get_stock_data(symbol):
    symbol: str = symbol or "IBM"

    response_data = get_temp_data()

    # url = (
    #     "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol="
    #     + f"{symbol}&interval=1min&apikey={API_KEY}"
    # )
    # response = requests.get(url)
    # response_data = response.json()
    # print(response_data)

    stock_data = response_data.get("Time Series (1min)", {})

    if not stock_data:
        return {"latest_value": 0, "change": 0}

    stock_data = list(stock_data.values())[0]

    latest_price = float(stock_data["4. close"])
    change = float(latest_price) - float(stock_data["1. open"])

    data = {"latest_value": latest_price, "change": change}
    print(data)
    return data
