import { Button, Checkbox, Divider, TextField, Tooltip } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import Header from 'components/header';
import randomizedId from 'utils';

import * as S from './styles';
import MyFormField, { Enum_MyFormFieldType } from 'components/myForm/field';
import { useState } from 'react';

const debug: boolean = true;

export interface IDataVisualizationProps {
  id: string;
}

export const DataVisualization = () => {
  const entry = (info: string) => {
    return `${randomizedId()} - ${info}`;
  };
  const [data, setData] = useState([
    { id: 'item1', value: 200 },
    { id: 'item2', value: 100 },
  ]);
  const dt = data;
  const xData = dt.map((item) => `${item.id} (${randomizedId()})`);
  const minValue = Math.min(...dt.map((item) => Number(item.value)));
  const yData = dt.map((item) => Number(item.value) + minValue);
  const dataAxis = {
    x: xData,
    y: yData,
  };
  console.log(dataAxis);
  return (
    <>
      <Header
        headContent={<>Data Visualization</>}
        subContent={`WIP: Data Visualization Graph`}
      />
      <Divider light />
      <MyFormField
        name="Provide your data"
        placeholder={`[{ "id": "item1", "value": 200 },{ "id": "item2", "value": 100 }]`}
        defaultValue={`[{ "id": "item1", "value": 200 },{ "id": "item2", "value": 100 }]`}
        formFieldType={Enum_MyFormFieldType.input}
        callback={(e) => {
          const value = e.target.value;
          if (value.trim() !== '') {
            try {
              const parsedData = JSON.parse(value);
              if (Array.isArray(parsedData)) {
                const isValidData = parsedData.every(
                  (item) => typeof item === 'object'
                );
                if (isValidData) {
                  setData(parsedData);
                } else {
                  console.error(
                    'Invalid data format. Each element in the array should be an object.'
                  );
                }
              } else {
                console.error(
                  'Invalid data format. Input should be an array of objects.'
                );
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        }}
      />
      <S.Graph>
        <BarChart
          xAxis={[{ id: 'barCategories', data: dataAxis.x, scaleType: 'band' }]}
          series={[{ data: dataAxis.y }]}
          width={1280}
          height={400}
        />
      </S.Graph>
      <>{debug && `debug: ${JSON.stringify(data)}`}</>
    </>
  );
};

export default DataVisualization;
