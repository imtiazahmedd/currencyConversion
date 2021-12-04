import React, { useEffect, useState } from 'react'
import './App.css';
import Converter from './converter';

const BASE_URL = "https://v6.exchangerate-api.com/v6/01869244a5784b090644c395/latest/PKR"

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFormCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState()
  const [amountInFromCurrency, setInFromCurrency] = useState(true);


  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }else {
    toAmount = amount;
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)]);
      const firstCurrency = Object.keys(data.conversion_rates)[0]
      setFormCurrency(data.base_code);
      setToCurrency(firstCurrency);
      setExchangeRate(data.conversion_rates[firstCurrency])
    })
}, [])

useEffect(() => {
  if(fromCurrency != null && toCurrency != null) {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
  }
}, [fromCurrency, toCurrency])

function handleFromAmountChange(e) {
  setAmount(e.target.value)
  setInFromCurrency(true)
}

function handleToAmountChange(e) {
  setAmount(e.target.value)
  setInFromCurrency(false)
}

  return (
    <div className="App">
        <h1>Exchange Rate Application</h1>
        <Converter options={currencyOptions} selectedCurrency = {fromCurrency}  onChangeCurrency={e => setFormCurrency(e.target.value)} amount={fromAmount} onChangeAmount={handleFromAmountChange} />
            <div className="equals">
                =
            </div>
        <Converter options={currencyOptions} selectedCurrency = {toCurrency} onChangeCurrency={e => setToCurrency(e.target.value)} amount={toAmount} onChangeAmount={handleToAmountChange} />
    </div>
  );
}

export default App;
