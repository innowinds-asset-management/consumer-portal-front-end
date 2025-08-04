import { ApexOptions } from 'apexcharts'

function generateData(baseval: any, count: number, yrange: any) {
  let i = 0
  const series = []
  while (i < count) {
    const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

    series.push([x, y, z])
    baseval += 86400000
    i++
  }
  return series
}

function generateData1(baseval1: any, count: number, yrange: any) {
  let i = 0
  const series = []
  while (i < count) {
    //var x =Math.floor(Math.random() * (750 - 1 + 1)) + 1;;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

    series.push([baseval1, y, z])
    baseval1 += 86400000
    i++
  }
  return series
}

export const simpleBubbleChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bubble',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: 'Bubble 1',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Bubble 2',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Bubble 3',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ],
  fill: {
    opacity: 0.8,
    gradient: {
      // enabled: false
    },
  },
  colors: ['#6b5eae', '#fbcc5c', '#fa5c7c'],
  xaxis: {
    tickAmount: 12,
    type: 'category',
  },
  yaxis: {
    max: 70,
  },
  grid: {
    borderColor: '#f1f3fa',
    padding: {
      bottom: 5,
    },
  },
  legend: {
    offsetY: 7,
  },
}

export const bubble3DChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bubble',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: 'Product 1',
      data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Product 2',
      data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Product 3',
      data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Product 4',
      data: generateData1(new Date('11 Feb 2017 GMT').getTime(), 20, {
        min: 10,
        max: 60,
      }),
    },
  ],
  fill: {
    type: 'gradient',
  },
  colors: ['#6b5eae', '#31ce77', '#fa5c7c', '#39afd1'],
  xaxis: {
    tickAmount: 12,
    type: 'datetime',

    labels: {
      rotate: 0,
    },
  },
  yaxis: {
    max: 70,
  },
  legend: {
    offsetY: 7,
  },
  grid: {
    borderColor: '#f1f3fa',
    padding: {
      bottom: 5,
    },
  },
}
