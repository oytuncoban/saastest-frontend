/* eslint-disable import/prefer-default-export */

import { VariantData } from '@/services/test';
import { AggregatedData } from '@/components/VariantLineGraph';

export function prepareAggregatedData(
  variantData: VariantData[]
): AggregatedData {
  const aggregatedData: AggregatedData = {};

  variantData.forEach((dataPoint) => {
    // Extract date by stripping the time
    const date = dataPoint.dateTime.split('T')[0];

    // Initialize date in the aggregated data if not present
    if (!aggregatedData[date]) {
      aggregatedData[date] = { variantA: 0, variantB: 0 };
    }

    // Increment the count based on variant and metric
    if (dataPoint.variant === 'A') {
      aggregatedData[date].variantA += dataPoint.metric;
    } else {
      aggregatedData[date].variantB += dataPoint.metric;
    }
  });

  return aggregatedData;
}

export function uuidv4() {
  // eslint-disable-next-line func-names
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0;
    // eslint-disable-next-line no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
