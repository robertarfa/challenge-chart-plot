import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import InputArea from './components/InputArea/InputArea';
import LineChart from './components/LineChart/LineChart';

import { parse } from 'dirty-json';
import { defaultDataChart } from './helpers/index'

const App = () => {

  useEffect(() => {
    setInputAreaDataChart(defaultDataChart)
  }, [defaultDataChart])

  const [inputAreaDataChart, setInputAreaDataChart] = useState()
  const [chartDatasets, setChartDatasets] = useState(null)

  const getInputValue = (inputValue) => {

    if (inputValue === '') {
      setInputAreaDataChart(defaultDataChart)
    } else {
      setInputAreaDataChart(inputValue)
    }
  }

  const generateChart = () => {
    //Encapsulate this block
    const dataStr = "[" + inputAreaDataChart.replace(/\n/g, ",") + "]";
    const jsonObj = parse(dataStr);
    setChartDatasets(jsonObj)
  }

  return (
    <>
      <Header />
      <InputArea inputAreaDataChart={inputAreaDataChart} getInputValue={getInputValue} />
      <LineChart chartDatasets={chartDatasets} />
      <Footer generateChart={generateChart} />
    </>
  );
}

export default App;
