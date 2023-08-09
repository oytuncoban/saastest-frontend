import { TestWithData } from '@/services/test';

export type TestInfoBoxProps = {
  testResults: Pick<TestWithData, 'testResults'>['testResults'];
};

function TestInfoBox({ testResults }: TestInfoBoxProps) {
  return (
    <div className="bg-blue-100 p-4 mt-4">
      {testResults ?? 'No additional test results available.'}
    </div>
  );
}

export default TestInfoBox;
