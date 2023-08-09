/* eslint-disable import/prefer-default-export */

import network from './network';
import discreteData from '@/mock/data/discrete.json';

export interface Test {
  id: string;
  name: string;
  type: 'discrete' | 'continous';
  alpha?: number;
}

export interface VariantData {
  id: string;
  testId: string;
  variant: string;
  metric: number;
  dateTime: string;
}

export interface TestResults {
  A: {
    variance: number;
    conversionRate: number;
  };

  B: {
    variance: number;
    conversionRate: number;
  };

  significance: number;
  alpha: number;
  mean: number;
  median: number;
}

export interface TestWithData extends Test {
  data: VariantData[];
  testResults: TestResults;
}

export const INITIAL_ROWS: Test[] = [
  { id: '11', name: 'Landing page sign-up', type: 'discrete' },
  { id: '2', name: 'Career Page', type: 'continous' },
  {
    id: '165',
    name: 'Test-13',
    type: 'discrete',
  },
  {
    id: '31',
    name: 'Discrete Metric Test (E-Commerce)',
    type: 'discrete',
  },
];

export function getTests() {
  return new Promise((resolve: (value: { data: Test[] }) => void) => {
    setTimeout(() => {
      resolve({
        data: INITIAL_ROWS,
      });
    }, 100);
  });

  return network.get('/tests');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getTest(id: string) {
  return new Promise((resolve: (value: { data: TestWithData }) => void) => {
    setTimeout(() => {
      resolve({
        data: discreteData as TestWithData,
      });
    }, 100);
  });

  return network.get(`/tests/${id}`);
}
