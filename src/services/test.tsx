/* eslint-disable import/prefer-default-export */

import { User } from './auth';
import network from './network';

export interface Test {
  id: string;
  name: string;
  type: 'discrete' | 'continous';
  alpha?: number;
  user?: User;
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
    variance?: number;
    conversionRate: number;
  };

  B: {
    variance?: number;
    conversionRate: number;
  };

  significance: number;
  sampleSize: number;
  alpha: number;
  mean: number;
  median: number;
}

export interface TestWithData extends Test {
  data: VariantData[];
  testResults: TestResults;
}

export function getTests() {
  return network.get('/tests');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getTest(id: string) {
  return network.get(`/tests/${id}`);
}

export function createTest(
  name: string,
  type: 'discrete' | 'continous',
  alpha: number
) {
  return network.post('/tests', {
    name,
    type,
    alpha,
  });
}
