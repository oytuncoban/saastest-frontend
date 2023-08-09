import React from 'react';
import { Line } from 'react-chartjs-2';

export type AggregatedData = {
  [date: string]: {
    variantA: number;
    variantB: number;
  };
};

export type VariantLineGraphProps = {
  data: AggregatedData;
};

function VariantLineGraph({ data }: VariantLineGraphProps) {
  const dates = Object.keys(data);
  const variantAData = dates.map((date) => data[date].variantA);
  const variantBData = dates.map((date) => data[date].variantB);

  const chartData = {
    labels: dates.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Variant A',
        data: variantAData,
        borderColor: '#FF6384',
        fill: false,
      },
      {
        label: 'Variant B',
        data: variantBData,
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: 'Test Results',
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default React.memo(VariantLineGraph);
