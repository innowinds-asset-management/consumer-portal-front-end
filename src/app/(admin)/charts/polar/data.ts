import { ApexOptions } from 'apexcharts'

export const basicPolarChartOpts: ApexOptions = {
  series: [14, 23, 21, 17, 15, 10],
  chart: {
    height: 380,
    type: 'polarArea',
  },
  stroke: {
    colors: ['#fff'],
  },
  fill: {
    opacity: 0.8,
  },
  labels: ['Vote A', 'Vote B', 'Vote C', 'Vote D', 'Vote E', 'Vote F'],
  legend: {
    position: 'bottom',
  },
  colors: ['#6b5eae', '#35b8e0', '#31ce77', '#fa5c7c', '#fbcc5c', '#39afd1'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}

export const MonochromePolarChartOpts: ApexOptions = {
  series: [42, 47, 52, 58, 65],
  chart: {
    height: 380,
    type: 'polarArea',
  },
  labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
  fill: {
    opacity: 1,
  },
  stroke: {
    width: 1,
  },
  yaxis: {
    show: false,
  },
  legend: {
    position: 'bottom',
  },
  plotOptions: {
    polarArea: {
      rings: {
        strokeWidth: 0,
      },
      spokes: {
        strokeWidth: 0,
      },
    },
  },
  theme: {
    monochrome: {
      enabled: true,
      shadeTo: 'light',
      color: '#6b5eae',
      shadeIntensity: 0.6,
    },
  },
}
