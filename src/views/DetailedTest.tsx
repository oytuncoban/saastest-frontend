/* eslint-disable no-param-reassign */
import { ArrowBackIos, Refresh, UploadFile } from '@mui/icons-material';
import {
  Alert,
  Button,
  IconButton,
  Paper,
  Snackbar,
  SnackbarOrigin,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { LoadingOverlay } from '@mantine/core';
import * as _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import TestTable from '@/components/TestTable';
import VariantLineGraph from '@/components/VariantLineGraph';
import VariantPieChart from '@/components/VariantPieChart';
import { TestWithData, getTest, uploadBulkCSV } from '@/services/test';
import { prepareAggregatedData } from '@/utils';

type DetailedTestProps = {
  selectedTestId: string | null;
  setSelectedTestId: React.Dispatch<React.SetStateAction<string | null>>;
};

interface Snack extends SnackbarOrigin {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export function DetailedTest({
  selectedTestId,
  setSelectedTestId,
}: DetailedTestProps) {
  const [testData, setTestData] = useImmer<TestWithData | null>(null);
  const [isLoading, setIsLoading] = useImmer<boolean>(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [snack, setSnack] = useImmer<Snack>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: '',
    severity: 'success',
  });
  const { vertical, horizontal, open, message, severity } = snack;

  function fetchTest(id: string) {
    setIsLoading(() => true);
    getTest(id)
      .then((r: { data: TestWithData }) => {
        if (r.data === null) throw new Error('Test not found');
        if (r.data === undefined) throw new Error('Test not found');
        setSnack((draft) => {
          draft.message = 'Test data fetched successfully';
          draft.severity = 'success';
          draft.open = true;
        });
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

  const uploadFile = (file: string | Blob) => {
    if (!selectedTestId) return;
    const formData = new FormData();
    formData.append('file', file);

    // Example request to the server
    setIsLoading(() => true);
    uploadBulkCSV(selectedTestId, formData)
      .then((response) => {
        setIsLoading(() => false);
        setSnack((draft) => {
          draft.message = 'File uploaded succesfully';
          draft.severity = 'success';
          draft.open = true;
        });
      })
      .catch((error) => {
        setSnack((draft) => {
          draft.message = 'Error uploading the file. Please try again.';
          draft.severity = 'error';
          draft.open = true;
        });
      })
      .finally(() => {
        setIsLoading(() => false);
        fetchTest(selectedTestId);
      });
  };

  const handleFileChange = (event) => {
    const file = event?.target.files[0];
    if (file) {
      if (file.name.endsWith('.csv')) {
        uploadFile(file);
      } else {
        // eslint-disable-next-line no-alert
        alert('Please select a .csv file');
      }
    }
  };

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

      <div className="w-screen">
        <h1 className="text-4xl w-full font-bold">
          {testData?.name}
          <IconButton
            className="p-0 !ml-2"
            onClick={() => selectedTestId && fetchTest(selectedTestId)}
          >
            <Refresh />
          </IconButton>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <Tooltip title="Upload CSV">
            <IconButton
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <UploadFile />
            </IconButton>
          </Tooltip>
        </h1>
      </div>
      {!isLoading && testData && testData.data.length > 0 ? (
        <div className="flex mt-8 gap-24 ">
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

          <div className="w-3/10 hidden lg:flex">
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
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{!isLoading && <h1> No Data</h1>}</>
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => {
          setSnack((draft) => {
            draft.open = false;
          });
        }}
        autoHideDuration={3000}
        key={vertical + horizontal}
      >
        <Alert
          severity={severity}
          onClose={() => {
            setSnack((draft) => {
              draft.open = false;
            });
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default DetailedTest;
