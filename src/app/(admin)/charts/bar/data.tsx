import small4 from '@/assets/images/small/small-4.jpg'
import { ApexOptions } from 'apexcharts'

export const basicBarChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ],
  colors: ['#39afd1'],
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
    axisBorder: {
      show: false,
    },
  },
  states: {
    hover: {
      // filter: 'none'
    },
  },
  grid: {
    borderColor: '#f1f3fa',
  },
}

export const groupedChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top',
      },
    },
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#fff'],
    },
  },
  colors: ['#fa5c7c', '#35b8e0'],
  stroke: {
    show: true,
    width: 1,
    colors: ['transparent'],
  },
  series: [
    {
      name: 'Series 1',
      data: [44, 55, 41, 64, 22, 43, 21],
    },
    {
      name: 'Series 2',
      data: [53, 32, 33, 52, 13, 44, 32],
    },
  ],
  xaxis: {
    categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
    axisBorder: {
      show: false,
    },
  },
  legend: {
    offsetY: 5,
  },
  states: {
    hover: {
      // filter: 'none'
    },
  },
  grid: {
    borderColor: '#f1f3fa',
    padding: {
      bottom: 5,
    },
  },
}

export const stackedBarChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    show: false,
  },
  series: [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4],
    },
    {
      name: 'Reborn Kid',
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ],
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    labels: {
      formatter: function (val) {
        return val + 'K'
      },
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: undefined,
    },
  },
  colors: ['#6b5eae', '#31ce77', '#fa5c7c', '#35b8e0', '#39afd1'],
  tooltip: {
    y: {
      formatter: function (val) {
        return val + 'K'
      },
    },
  },
  fill: {
    opacity: 1,
  },
  states: {
    hover: {
      // filter: 'none'
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetY: 10,
  },
  grid: {
    borderColor: '#f1f3fa',
  },
}

export const fullStackedBarChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  stroke: {
    width: 1,
    colors: ['transparent'],
  },
  series: [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4],
    },
    {
      name: 'Reborn Kid',
      data: [25, 12, 19, 32, 25, 24, 10],
    },
  ],
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    axisBorder: {
      show: false,
    },
  },
  colors: ['#fbcc5c', '#39afd1', '#35b8e0', '#e3eaef', '#6b5eae'],
  tooltip: {
    y: {
      formatter: function (val) {
        return val + 'K'
      },
    },
  },
  fill: {
    opacity: 1,
  },
  states: {
    hover: {
      // filter: 'none'
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center',
    offsetY: 10,
  },
  grid: {
    borderColor: '#f1f3fa',
    padding: {
      top: 0,
    },
  },
}

export const negativeBarChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  colors: ['#fa5c7c', '#31ce77'],
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1,
    colors: ['transparent'],
  },
  series: [
    {
      name: 'Males',
      data: [0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5, 3],
    },
    {
      name: 'Females',
      data: [-0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8],
    },
  ],
  yaxis: {
    min: -5,
    max: 5,
    title: {
      // text: 'Age',
    },
  },
  tooltip: {
    shared: false,
    x: {
      formatter: function (val: number) {
        return val.toString()
      },
    },
    y: {
      formatter: function (val) {
        return Math.abs(val) + '%'
      },
    },
  },
  xaxis: {
    categories: [
      '85+',
      '80-84',
      '75-79',
      '70-74',
      '65-69',
      '60-64',
      '55-59',
      '50-54',
      '45-49',
      '40-44',
      '35-39',
      '30-34',
      '25-29',
      '20-24',
      '15-19',
      '10-14',
      '5-9',
      '0-4',
    ],
    title: {
      text: 'Percent',
    },
    labels: {
      formatter: function (val: string) {
        return Math.abs(Math.round(Number(val))) + '%'
      },
    },
    axisBorder: {
      show: false,
    },
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

export const reversedBarChartOpts: ApexOptions = {
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690],
    },
  ],
  chart: {
    type: 'bar',
    height: 380,
  },
  annotations: {
    xaxis: [
      {
        x: 500,
        borderColor: '#0acf97',
        label: {
          borderColor: '#0acf97',
          style: {
            color: '#fff',
            background: '#0acf97',
          },
          text: 'X annotation',
        },
      },
    ],
    yaxis: [
      {
        y: 'July',
        y2: 'September',
        label: {
          text: 'Y annotation',
        },
      },
    ],
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
    axisBorder: {
      show: false,
    },
  },
  colors: ['#6b5eae', '#31ce77'],
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  yaxis: {
    reversed: true,
    axisTicks: {
      show: true,
    },
  },
}

export const imageBarChartOpts: ApexOptions = {
  chart: {
    height: 450,
    type: 'bar',
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '100%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    colors: ['#fff'],
    width: 0.2,
  },
  series: [
    {
      name: 'coins',
      data: [2, 4, 3, 4, 3, 5, 5, 6.5, 6, 5, 4, 5, 8, 7, 7, 8, 8, 10, 9, 9, 12, 12, 11, 12, 13, 14, 16, 14, 15, 17, 19, 21],
    },
  ],
  // labels: labels,
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
    title: {
      text: 'Weight',
    },
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
  },
  grid: {
    position: 'back',
    borderColor: '#f1f3fa',
  },
  fill: {
    type: 'image',
    opacity: 0.87,
    image: {
      src: [small4.src],
      width: 466,
      height: 406,
    },
  },
}

export const DataLabelsChartOpts: ApexOptions = {
  chart: {
    height: 450,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: 'bottom',
      },
    },
  },
  colors: ['#6b5eae', '#31ce77', '#fa5c7c', '#35b8e0', '#39afd1', '#2b908f', '#fbcc5c', '#90ee7e', '#f48024', '#212730'],
  dataLabels: {
    enabled: true,
    textAnchor: 'start',
    style: {
      colors: ['#fff'],
    },
    formatter: function (val, opt) {
      return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
    },
    offsetX: 0,
    dropShadow: {
      enabled: false,
    },
  },
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ],
  stroke: {
    width: 0,
    colors: ['#fff'],
  },
  xaxis: {
    categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'India'],
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  grid: {
    borderColor: '#f1f3fa',
  },

  tooltip: {
    theme: 'dark',
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
  },
}

export const patternBarChartOpts: ApexOptions = {
  chart: {
    height: 380,
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
    // shadow: {
    //     enabled: true,
    //     blur: 1,
    //     opacity: 0.5
    // }
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '60%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
  },
  series: [
    {
      name: 'Marine Sprite',
      data: [44, 55, 41, 37, 22, 43, 21],
    },
    {
      name: 'Striking Calf',
      data: [53, 32, 33, 52, 13, 43, 32],
    },
    {
      name: 'Tank Picture',
      data: [12, 17, 11, 9, 15, 11, 20],
    },
    {
      name: 'Bucket Slope',
      data: [9, 7, 5, 8, 6, 9, 4],
    },
  ],
  xaxis: {
    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: undefined,
    },
  },
  tooltip: {
    shared: false,
    y: {
      formatter: function (val) {
        return val + 'K'
      },
    },
  },
  colors: ['#6b5eae', '#31ce77', '#fa5c7c', '#39afd1'],
  fill: {
    type: 'pattern',
    opacity: 1,
    pattern: {
      style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings
    },
  },
  states: {
    hover: {
      // filter: 'none'
    },
  },
  legend: {
    position: 'right',
  },
  grid: {
    borderColor: '#f1f3fa',
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        legend: {
          show: false,
        },
      },
    },
  ],
}

export const markersBarChartOpts: ApexOptions = {
  series: [
    {
      name: 'Actual',
      data: [
        {
          x: '2017',
          y: 12,
          goals: [
            {
              name: 'Expected',
              value: 14,
              strokeWidth: 2,
              strokeDashArray: 2,
              strokeColor: '#fa5c7c',
            },
          ],
        },
        {
          x: '2018',
          y: 44,
          goals: [
            {
              name: 'Expected',
              value: 54,
              strokeWidth: 5,
              strokeHeight: 10,
              strokeColor: '#fa5c7c',
            },
          ],
        },
        {
          x: '2019',
          y: 54,
          goals: [
            {
              name: 'Expected',
              value: 52,
              strokeWidth: 10,
              strokeHeight: 0,
              strokeLineCap: 'round',
              strokeColor: '#fa5c7c',
            },
          ],
        },
        {
          x: '2020',
          y: 66,
          goals: [
            {
              name: 'Expected',
              value: 61,
              strokeWidth: 10,
              strokeHeight: 0,
              strokeLineCap: 'round',
              strokeColor: '#fa5c7c',
            },
          ],
        },
        {
          x: '2021',
          y: 81,
          goals: [
            {
              name: 'Expected',
              value: 66,
              strokeWidth: 10,
              strokeHeight: 0,
              strokeLineCap: 'round',
              strokeColor: '#fa5c7c',
            },
          ],
        },
        {
          x: '2022',
          y: 67,
          goals: [
            {
              name: 'Expected',
              value: 70,
              strokeWidth: 5,
              strokeHeight: 10,
              strokeColor: '#fa5c7c',
            },
          ],
        },
      ],
    },
  ],
  chart: {
    height: 380,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  colors: ['#31ce77', '#fa5c7c'],
  dataLabels: {
    // dataLabels: {
    formatter: function (val: number) {
      // if (goals && goals.length) {
      //   return `${val} / ${goals[0].value}`
      // }
      return val
    },
    // },
  },
  legend: {
    show: true,
    showForSingleSeries: true,
    customLegendItems: ['Actual', 'Expected'],
    markers: {
      fillColors: ['#31ce77', '#fa5c7c'],
    },
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
  },
}
