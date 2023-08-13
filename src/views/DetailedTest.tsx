import { ArrowBackIos } from '@mui/icons-material';
import { Button, Paper, TableContainer } from '@mui/material';
import { Box, LoadingOverlay } from '@mantine/core';
import * as _ from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import TestTable from '@/components/TestTable';
import VariantLineGraph from '@/components/VariantLineGraph';
import VariantPieChart from '@/components/VariantPieChart';
import { TestWithData, getTest } from '@/services/test';
import { prepareAggregatedData } from '@/utils';

type DetailedTestProps = {
  selectedTestId: string | null;
  setSelectedTestId: React.Dispatch<React.SetStateAction<string | null>>;
};

export function DetailedTest({
  selectedTestId,
  setSelectedTestId,
}: DetailedTestProps) {
  const [testData, setTestData] = useImmer<TestWithData | null>(null);
  const [isLoading, setIsLoading] = useImmer<boolean>(false);
  const navigate = useNavigate();

  function fetchTest(id: string) {
    setIsLoading(() => true);
    getTest(id)
      .then((r: { data: TestWithData }) => {
        if (r.data === null) throw new Error('Test not found');
        if (r.data === undefined) throw new Error('Test not found');
        console.log(r.data);
        setTestData(() => r.data);
        setIsLoading(() => false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(() => false);
        navigate('/dashboard');
      });
  }

  useEffect(() => {
    if (!selectedTestId) return;
    fetchTest(selectedTestId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestId]);

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Button
        variant="outlined"
        onClick={() => {
          setSelectedTestId(null);
        }}
      >
        <ArrowBackIos />
        Go Back
      </Button>

      <div className="w-full">
        <h1 className="text-4xl font-bold">{testData?.name} </h1>
      </div>
      {!isLoading && testData && testData.data.length > 0 ? (
        <div className="flex mt-8 w-full gap-24 ">
          <div className="w-7/10 flex flex-col flex-grow gap-4">
            <div className="row-auto">
              <TestTable
                variantStats={{
                  A: testData.testResults?.A,
                  B: testData.testResults?.B,
                }}
                generalStats={_.pick(testData.testResults, [
                  'mean',
                  'median',
                  'significance',
                  'alpha',
                ])}
              />
            </div>
            <div className="row-auto w-full h-full">
              <TableContainer className="w-full" component={Paper}>
                <VariantLineGraph data={prepareAggregatedData(testData.data)} />
              </TableContainer>
            </div>
          </div>

          <div className="w-3/10 flex ">
            <div className="flex flex-col justify-center items-center w-full gap-8">
              <div className="row-auto">
                <VariantPieChart
                  variant="A"
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  convRate={testData.testResults?.A?.conversionRate / 100}
                />
              </div>
              <div className="row-auto">
                <VariantPieChart
                  variant="B"
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  convRate={testData.testResults?.A?.conversionRate / 100}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{!isLoading && <h1> No Data</h1>}</>
      )}
    </>
  );
}

export default DetailedTest;
