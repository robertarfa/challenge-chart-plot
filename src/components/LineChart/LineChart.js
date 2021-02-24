import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

export default function LineChart({ chartDatasets }) {

  const [group, setGroup] = useState([])
  const [select, setSelect] = useState([])
  const [dataChart, setDataChart] = useState()
  const [finalDataChart, setFinalDataChart] = useState()
  const [timezoneDiff, setTimezoneDiff] = useState()
  const [spanLimits, setSpanLimits] = useState([])

  useEffect(() => {
    console.log("chartDatasets", chartDatasets)

    if (chartDatasets && chartDatasets.length > 0) {
      setGroup(chartDatasets && chartDatasets.filter(item => item.type === 'start').map(item => item.group))
      setSelect(chartDatasets && chartDatasets.filter(item => item.type === 'start').map(item => item.select))
      setDataChart(chartDatasets && chartDatasets.filter(item => item.type === 'data'))
    }

    if (chartDatasets !== null && group && group.length > 0) {
      startAndStopPoint(chartDatasets)
    }

  }, [chartDatasets]);

  const startAndStopPoint = (chartDatasets) => {

    //search start line
    let startLine = chartDatasets.findIndex(event => event.type == 'start');
    let spanLine = chartDatasets.findIndex(event => event.type === 'span');

    //search stop line
    let stopLine = chartDatasets.findIndex(event => event.type === 'stop');

    if (spanLine < stopLine && spanLine > startLine) {
      typeSpan(chartDatasets[spanLine]);
    }
    else {
      //throw error span does not exist
      console.log("Please insert a Span line");
    }

    for (let event of chartDatasets.splice(startLine)) {

      const type = event.type

      switch (type) {
        //read data
        case 'start': {

          break;
        }

        case 'span': {

          break;
        }

        case 'data': {
          readingData(event);
          break;
        }

        case 'stop': {

          break;
        }

        default: {
          console.log("Type not exists");
        }
      }
    }

  }

  const typeSpan = (span) => {

    // console.log("typeSpan", span)
    let begin = span.begin
    let end = span.end

    setSpanLimits([begin, end])

  }

  const typeSpanLimits = (data) => {
    const timestamp = data.timestamp

    if (timestamp < spanLimits[0] || timestamp > spanLimits[1]) {

      return false;
    } else {
      return true;
    }
  }

  const readingData = (dataValue) => {
    if (!typeSpanLimits(dataValue)) {
      return;
    }


    let data = []
    let dataArray = []
    let array = []


    data = [
      {
        x: dataValue.timestamp,
        y: dataValue.min_response_time
      },
      {
        x: dataValue.timestamp,
        y: dataValue.max_response_time
      }
    ]

    dataArray.push(data[0])

    // }

    let color = generateColor()

    let obj = [
      {
        label: dataValue.os + " " + dataValue.browser + " " + 'min_response_time',

        backgroundColor: color,
        borderColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,

        fill: false,
        lineTension: 0.0,
        borderDashOffset: 0.0,
        pointBorderWidth: 6,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 0.1,
        pointRadius: 3,
        pointHitRadius: 3,
        borderWidth: 2,
        data: dataArray
      }
    ]

    array.push(obj[0])
    setFinalDataChart(array)

    // console.log("Logs point", point)

    // console.log("dataChart, lineName, point", dataChart, lineName, point)

  }

  const data = {
    datasets: finalDataChart
  }
  console.log("data", data)

  function generateColor() {
    const h = Math.floor(Math.random() * 361);
    const s = 100;
    const l = 50;

    return `hsl(${h},${s}%,${l}%)`;
  }


  const options = {
    maintainAspectRatio: false,

    legend: {
      display: true,
      position: "right",
      reverse: false,
      align: 'start',

      labels: {
        fontSize: 12,
        fontStyle: "bold",
        usePointStyle: true,
        padding: 18,
      }
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'minute',
            displayFormats: {
              minute: 'HH:mm', //caps in hour - 24h format
            },
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }
      ],
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 5,
            stepSize: 0.1,
            display: false,
            beginAtZero: true,
          }
        }
      ]
    }
  };

  return (
    <div>
      <Line
        options={options}
        data={data}
      />
    </div>
  )
}
