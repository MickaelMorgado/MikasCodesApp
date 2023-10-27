import { Button, Checkbox, Divider, TextField, Tooltip } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import Header from 'components/header';
import randomizedId from 'utils';

import * as S from './styles';
import * as GS from '../globalStyles';

export interface IDataVisualizationProps {
  id: string;
}

export const DataVisualization = () => {
  const entry = (info: string) => {
    return `${randomizedId()} - ${info}`
  }
  const data = [
    {id: entry('27-10-2023 XXXXXX'), value: 200,},
    {id: entry('27-10-2023 WERUUF'), value: 100,},
  ]
  const xData = data.map(item => item.id);
  const yData = data.map(item => item.value);
  const dataAxis = {
    x: xData,
    y: yData,
  }
  return (
    <>
      <Header
        headContent={<>Data Visualization</>}
        subContent={`WIP: Data Visualization Graph`}
      />
      <Divider light />
      <S.Graph>
        <BarChart
          xAxis={[{ id: 'barCategories', data: dataAxis.x, scaleType: 'band', },]}
          series={[{ data: dataAxis.y, },]}
          width={1280}
          height={400}
        />
      </S.Graph>
    </>
  );
};

export default DataVisualization;
