import React from 'react';
import { Pie } from 'react-chartjs-2';

// Update the props to accept the conversion rate for each variant
export type VariantPieChartProps = {
  variant: 'A' | 'B';
  convRate: number | undefined;
};

function VariantPieChart({ variant, convRate }: VariantPieChartProps) {
  if (!convRate) return null;
  const data = {
    labels: [variant, `Not ${variant}`],
    datasets: [
      {
        label: "Variant's Conversion Rate",
        data: [convRate, 1 - convRate],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return <Pie data={data} />;
}

export default React.memo(VariantPieChart);
