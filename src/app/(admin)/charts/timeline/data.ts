import { ApexOptions } from 'apexcharts'
import moment from 'moment'

export const basicTimelineChartOpts: ApexOptions = {
  series: [
    {
      data: [
        {
          x: 'Code',
          y: [new Date('2019-03-02').getTime(), new Date('2019-03-04').getTime()],
        },
        {
          x: 'Test',
          y: [new Date('2019-03-04').getTime(), new Date('2019-03-08').getTime()],
        },
        {
          x: 'Validation',
          y: [new Date('2019-03-08').getTime(), new Date('2019-03-12').getTime()],
        },
        {
          x: 'Deployment',
          y: [new Date('2019-03-12').getTime(), new Date('2019-03-18').getTime()],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeBar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#f34943'],
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
  },
}

export const distributedTimelineChartOpts: ApexOptions = {
  series: [
    {
      data: [
        {
          x: 'Analysis',
          y: [new Date('2019-02-27').getTime(), new Date('2019-03-04').getTime()],
          fillColor: '#6b5eae',
        },
        {
          x: 'Design',
          y: [new Date('2019-03-04').getTime(), new Date('2019-03-08').getTime()],
          fillColor: '#31ce77',
        },
        {
          x: 'Coding',
          y: [new Date('2019-03-07').getTime(), new Date('2019-03-10').getTime()],
          fillColor: '#fa5c7c',
        },
        {
          x: 'Testing',
          y: [new Date('2019-03-08').getTime(), new Date('2019-03-12').getTime()],
          fillColor: '#35b8e0',
        },
        {
          x: 'Deployment',
          y: [new Date('2019-03-12').getTime(), new Date('2019-03-17').getTime()],
          fillColor: '#39afd1',
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeBar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      dataLabels: {
        hideOverflowingLabels: false,
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: any, opts) {
      const label = opts.w.globals.labels[opts.dataPointIndex]
      const a = moment(val[0])
      const b = moment(val[1])
      const diff = b.diff(a, 'days')
      return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
    },
    style: {
      colors: ['#f3f4f5', '#fff'],
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: true,
  },
}

export const multiSeriesTimelineChartOpts: ApexOptions = {
  series: [
    {
      name: 'Bob',
      data: [
        {
          x: 'Design',
          y: [new Date('2019-03-05').getTime(), new Date('2019-03-08').getTime()],
        },
        {
          x: 'Code',
          y: [new Date('2019-03-08').getTime(), new Date('2019-03-11').getTime()],
        },
        {
          x: 'Test',
          y: [new Date('2019-03-11').getTime(), new Date('2019-03-16').getTime()],
        },
      ],
    },
    {
      name: 'Joe',
      data: [
        {
          x: 'Design',
          y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()],
        },
        {
          x: 'Code',
          y: [new Date('2019-03-06').getTime(), new Date('2019-03-09').getTime()],
        },
        {
          x: 'Test',
          y: [new Date('2019-03-10').getTime(), new Date('2019-03-19').getTime()],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeBar',
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
    enabled: true,
    formatter: function (val: any) {
      const a = moment(val[0])
      const b = moment(val[1])
      const diff = b.diff(a, 'days')
      return diff + (diff > 1 ? ' days' : ' day')
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 100, 100],
    },
  },
  colors: ['#35b8e0', '#39afd1'],
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
  },
  legend: {
    position: 'top',
  },
}

export const advancedTimelineChartOpts: ApexOptions = {
  series: [
    {
      name: 'Bob',
      data: [
        {
          x: 'Design',
          y: [new Date('2019-03-05').getTime(), new Date('2019-03-08').getTime()],
        },
        {
          x: 'Code',
          y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()],
        },
        {
          x: 'Code',
          y: [new Date('2019-03-05').getTime(), new Date('2019-03-07').getTime()],
        },
        {
          x: 'Test',
          y: [new Date('2019-03-03').getTime(), new Date('2019-03-09').getTime()],
        },
        {
          x: 'Test',
          y: [new Date('2019-03-08').getTime(), new Date('2019-03-11').getTime()],
        },
        {
          x: 'Validation',
          y: [new Date('2019-03-11').getTime(), new Date('2019-03-16').getTime()],
        },
        {
          x: 'Design',
          y: [new Date('2019-03-01').getTime(), new Date('2019-03-03').getTime()],
        },
      ],
    },
    {
      name: 'Joe',
      data: [
        {
          x: 'Design',
          y: [new Date('2019-03-02').getTime(), new Date('2019-03-05').getTime()],
        },
        {
          x: 'Test',
          y: [new Date('2019-03-06').getTime(), new Date('2019-03-16').getTime()],
          goals: [
            {
              name: 'Break',
              value: new Date('2019-03-10').getTime(),
              strokeColor: '#CD2F2A',
            },
          ],
        },
        {
          x: 'Code',
          y: [new Date('2019-03-03').getTime(), new Date('2019-03-07').getTime()],
        },
        {
          x: 'Deployment',
          y: [new Date('2019-03-20').getTime(), new Date('2019-03-22').getTime()],
        },
        {
          x: 'Design',
          y: [new Date('2019-03-10').getTime(), new Date('2019-03-16').getTime()],
        },
      ],
    },
    {
      name: 'Dan',
      data: [
        {
          x: 'Code',
          y: [new Date('2019-03-10').getTime(), new Date('2019-03-17').getTime()],
        },
        {
          x: 'Validation',
          y: [new Date('2019-03-05').getTime(), new Date('2019-03-09').getTime()],
          goals: [
            {
              name: 'Break',
              value: new Date('2019-03-07').getTime(),
              strokeColor: '#CD2F2A',
            },
          ],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeBar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '80%',
    },
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
  },
  stroke: {
    width: 1,
  },
  colors: ['#6b5eae', '#31ce77', '#fa5c7c'],
  fill: {
    type: 'solid',
    opacity: 0.6,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
  },
}

export const groupTimelineChartOpts: ApexOptions = {
  series: [
    // George Washington
    {
      name: 'George Washington',
      data: [
        {
          x: 'President',
          y: [new Date(1789, 3, 30).getTime(), new Date(1797, 2, 4).getTime()],
        },
      ],
    },
    // John Adams
    {
      name: 'John Adams',
      data: [
        {
          x: 'President',
          y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
        },
        {
          x: 'Vice President',
          y: [new Date(1789, 3, 21).getTime(), new Date(1797, 2, 4).getTime()],
        },
      ],
    },
    // Thomas Jefferson
    {
      name: 'Thomas Jefferson',
      data: [
        {
          x: 'President',
          y: [new Date(1801, 2, 4).getTime(), new Date(1809, 2, 4).getTime()],
        },
        {
          x: 'Vice President',
          y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
        },
        {
          x: 'Secretary of State',
          y: [new Date(1790, 2, 22).getTime(), new Date(1793, 11, 31).getTime()],
        },
      ],
    },
    // Aaron Burr
    {
      name: 'Aaron Burr',
      data: [
        {
          x: 'Vice President',
          y: [new Date(1801, 2, 4).getTime(), new Date(1805, 2, 4).getTime()],
        },
      ],
    },
    // George Clinton
    {
      name: 'George Clinton',
      data: [
        {
          x: 'Vice President',
          y: [new Date(1805, 2, 4).getTime(), new Date(1812, 3, 20).getTime()],
        },
      ],
    },
    // John Jay
    {
      name: 'John Jay',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1789, 8, 25).getTime(), new Date(1790, 2, 22).getTime()],
        },
      ],
    },
    // Edmund Randolph
    {
      name: 'Edmund Randolph',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1794, 0, 2).getTime(), new Date(1795, 7, 20).getTime()],
        },
      ],
    },
    // Timothy Pickering
    {
      name: 'Timothy Pickering',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1795, 7, 20).getTime(), new Date(1800, 4, 12).getTime()],
        },
      ],
    },
    // Charles Lee
    {
      name: 'Charles Lee',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1800, 4, 13).getTime(), new Date(1800, 5, 5).getTime()],
        },
      ],
    },
    // John Marshall
    {
      name: 'John Marshall',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1800, 5, 13).getTime(), new Date(1801, 2, 4).getTime()],
        },
      ],
    },
    // Levi Lincoln
    {
      name: 'Levi Lincoln',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1801, 2, 5).getTime(), new Date(1801, 4, 1).getTime()],
        },
      ],
    },
    // James Madison
    {
      name: 'James Madison',
      data: [
        {
          x: 'Secretary of State',
          y: [new Date(1801, 4, 2).getTime(), new Date(1809, 2, 3).getTime()],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: 'rangeBar',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: '50%',
      rangeBarGroupRows: true,
    },
  },
  colors: ['#6b5eae', '#31ce77', '#fa5c7c', '#35b8e0', '#39afd1', '#ffc35a', '#eef2f7', '#313a46', '#3577f1', '#0ab39c', '#f0a548', '#68eaff'],
  fill: {
    type: 'solid',
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
  },
  legend: {
    position: 'right',
  },
}
