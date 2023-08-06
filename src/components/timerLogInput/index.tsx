import React from 'react';
import dayjs from 'dayjs';
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import * as S from './styles';
import { Enum_FormatDate, formatDate } from 'utils';

export enum Enum_TimerLogInputVariant {
  start,
  end,
}

export interface ITimerLogInputProps {
  variant: Enum_TimerLogInputVariant;
  date?: Date | null;
}

export const TimerLogInput = ({ date, variant }: ITimerLogInputProps) => {
  return (
    <S.TimerLogInput>
      <S.Input
        type="text"
        value={
          date
            ? formatDate(date, {
                format: Enum_FormatDate.exactTime,
              })
            : '...'
        }
        variant={variant}
      />
    </S.TimerLogInput>
  );
};

export default TimerLogInput;
