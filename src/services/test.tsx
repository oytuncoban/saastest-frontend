/* eslint-disable import/prefer-default-export */

export interface Test {
  id: string;
  name: string;
  type: 'discrete' | 'continous';
}

export const INITIAL_ROWS: Test[] = [
  { id: '11', name: 'Landing page sign-up', type: 'discrete' },
  { id: '2', name: 'Career Page', type: 'continous' },
];

export function getTests() {
  return new Promise((resolve: (value: { data: Test[] }) => void) => {
    setTimeout(() => {
      resolve({
        data: INITIAL_ROWS,
      });
    }, 1000);
  });
}
