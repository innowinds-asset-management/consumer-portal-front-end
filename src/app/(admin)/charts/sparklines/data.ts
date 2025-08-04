import { ApexOptions } from 'apexcharts'

const randomizeArray = function (arg: any) {
  const array = arg.slice()
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

// data for the sparklines that appear below header area
const sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]

export const spark1ChartOpts: ApexOptions = {
  chart: {
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    opacity: 0.2,
  },
  series: [
    {
      name: 'Paces Sales ',
      data: randomizeArray(sparklineData),
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ['#6b5eae'],
  title: {
    text: '$424,652',
    offsetX: 20,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Sales',
    offsetX: 20,
    style: {
      fontSize: '14px',
    },
  },
}

export const spark2ChartOpts: ApexOptions = {
  chart: {
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    opacity: 0.2,
  },
  series: [
    {
      name: 'Paces Expenses ',
      data: randomizeArray(sparklineData),
    },
  ],
  yaxis: {
    min: 0,
  },
  colors: ['#fbcc5c'],
  title: {
    text: '$235,312',
    offsetX: 20,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Expenses',
    offsetX: 20,
    style: {
      fontSize: '14px',
    },
  },
}

export const spark3ChartOpts: ApexOptions = {
  chart: {
    type: 'area',
    height: 160,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    width: 2,
    curve: 'straight',
  },
  fill: {
    opacity: 0.2,
  },
  series: [
    {
      name: 'Net Profits ',
      data: randomizeArray(sparklineData),
    },
  ],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  yaxis: {
    min: 0,
  },
  colors: ['#31ce77'],
  title: {
    text: '$135,965',
    offsetX: 20,
    style: {
      fontSize: '24px',
    },
  },
  subtitle: {
    text: 'Profits',
    offsetX: 20,
    style: {
      fontSize: '14px',
    },
  },
}

// export const sparkChartData: SparkChartType[] = [
//   {
//     total: '32,554',
//     percentage: 15,
//     lineChart: {
//       data:[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
//     },
//     barChart: {data:[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]},
//     variant: "#727cf5"
//   },
//   {
//     total: '23,533',
//     percentage: 7,
//     lineChart: {data:[12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]},
//     barChart: {data:[12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]},
//     variant: "#0acf97"
//   },
//   {
//     total: '54,276',
//     percentage: 9,
//     lineChart: {data:[47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]},
//     barChart: {data:[47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]},
//     variant: "#ffbc00"
//   },
//   {
//     total: '11,533',
//     percentage: 2,
//     lineChart: {data:[15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]},
//     barChart: {data:[25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]},
//     variant: "#fa5c7c"
//   },
// ]

export const chart1Opts: ApexOptions = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  colors: ['#6b5eae'],
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {},
    marker: {
      show: false,
    },
  },
}

export const chart5Opts: ApexOptions = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#6b5eae'],
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}

export const chart2Opts: ApexOptions = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#0acf97'],
  series: [
    {
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}

export const chart6Opts: ApexOptions = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#0acf97'],
  series: [
    {
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}

export const chart3Opts: ApexOptions = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#ffbc00'],
  series: [
    {
      data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}

export const chart7Opts: ApexOptions = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#ffbc00'],
  series: [
    {
      data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}

export const chart4Opts: ApexOptions = {
  chart: {
    type: 'line',
    width: 140,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#fa5c7c'],
  series: [
    {
      data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15],
    },
  ],
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  markers: {
    size: 0,
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}

export const chart8Opts: ApexOptions = {
  chart: {
    type: 'bar',
    width: 100,
    height: 60,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
    },
  },
  colors: ['#fa5c7c'],
  series: [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
    },
  ],
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
  xaxis: {
    crosshairs: {
      width: 1,
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    y: {
      title: {
        formatter: function () {
          return ''
        },
      },
    },
    marker: {
      show: false,
    },
  },
}
