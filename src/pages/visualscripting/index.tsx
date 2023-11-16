import {
  Button,
  Checkbox,
  Divider,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from '@mui/material';
import React, {
  ReactElement,
  ReactFragment,
  ReactNode,
  useEffect,
  useState,
} from 'react';
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
import Draggable from 'react-draggable';
import { Flutter } from './flutter';

const tabItems = [
  {
    name: 'JS',
    children: (
      <>
        <MyFormField
          name="search snippet"
          formFieldType={Enum_MyFormFieldType.input}
          callback={(e: SelectChangeEvent) => {
            console.log(e.target.value);
          }}
        />
        <Viewer />
      </>
    ),
  },
  {
    name: 'MJML',
    children: <>MJML</>,
  },
  {
    name: 'Flutter',
    children: <Flutter />,
  },
];

export const VisualScripting = () => {
  return (
    <>
      <Header headContent={<>Visual Scripting</>} subContent={`WIP`} />
      <Divider light />
      <Flutter />
    </>
  );
};

export default VisualScripting;
