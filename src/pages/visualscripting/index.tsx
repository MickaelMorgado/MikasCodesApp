import { Button, Checkbox, Divider, SelectChangeEvent, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyFormField, { Enum_MyFormFieldType } from 'components/myForm/field';
import PaddedContent from 'components/paddedContent';
import {
  Enum_StorageSlot,
  getLocalStorageItem,
  validation,
  randomizedId,
  setLocalStorageItem,
  sortBy,
  Enum_FormatDate,
  formatDate,
  RenderReactElementFromMap,
} from '../../utils';

import * as S from './styles';
import * as GS from '../globalStyles';
import Header from 'components/header';
import { VerticalTabs } from 'components/verticalTabs';
import Viewer from './viewer';

export interface IHourLoggingProps {
  id: string;
}

const tabItems = [
  {
    name: 'JS',
    children: <>
      <MyFormField
        name='search snippet'
        formFieldType={Enum_MyFormFieldType.input}
        callback={(e: SelectChangeEvent) => { console.log(e.target.value) }}
      />
      <Viewer />
    </>
  },
  { name: 'MJML', children: <div>Content for Tab 2</div> },
  { name: 'Flutter', children: <div>Content for Tab 3</div> },
];

export const VisualScripting = ({ id }: IHourLoggingProps) => {
  return (
    <>
      <Header
        headContent={<>Visual Scripting</>}
        subContent={`WIP`}
      />
      <Divider light />
      <VerticalTabs items={tabItems} />
    </>
  );
};

export default VisualScripting;
