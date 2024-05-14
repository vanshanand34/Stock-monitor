import requests
import time


API_KEY = "8M5ZH1341932VVOE"

def get_stock_data(symbol):
    if symbol is None or symbol=="":
        symbol = "IBM"
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=1min&apikey={API_KEY}'
    r = requests.get(url)
    data = r.json()
    print(data)
    mydict =  data['Time Series (1min)']
    mydict = list(mydict.values())
    mydict = mydict[0]
    latest_price = float(mydict['4. close'])
    change = float(latest_price) - float(mydict['1. open'])
    data = {"latest_value":latest_price,"change":change}
    return data