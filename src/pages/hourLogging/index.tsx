import { Button, Divider, TextField } from '@mui/material';
import React, { useState } from 'react';
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
import CopyToClipboardButton from 'components/CopyToClipboardButton';
import AppLoaderIcon from 'components/appLoaderIcon';
import Description from 'components/description';

export interface IHourLoggingProps {
  id: string;
}

export interface ICheckpoint {
  date: {
    start: Date;
    end: Date | null;
  };
  description: string;
}

export const HourLogging = ({ id }: IHourLoggingProps) => {
  const [checkpoints, setCheckpoints] = useState<ICheckpoint[]>(
    JSON.parse(getLocalStorageItem(Enum_StorageSlot.hourLogs))
  );
  const [checkpointsToString, setCheckpointsToString] = useState<string>('');
  const [flipFlop, setFlipFlop] = useState(true);

  const addCheckpoint = (checkpoint: ICheckpoint) => {
    setCheckpoints((prevState) => {
      if (prevState.length !== 0) {
        const lastCheckpointModified = (prevState[
          prevState.length - 1
        ].date.end = checkpoint.date.start);
      }

      return [...prevState, checkpoint];
    });
    setLocalStorageItem(Enum_StorageSlot.hourLogs, JSON.stringify(checkpoints));
  };

  const clearCheckpoints = () => {
    setCheckpoints([]);
  };

  const stringifyCheckpoints = (checkpoints: [], newTime: Date) => {
    checkpoints.map((point) => {
      setCheckpointsToString(checkpointsToString + ' - ' + formatDate(point));
    });
  };

  const renderCheckpoints = (checkpoints: []) => {
    let template = <></>;
    checkpoints.map((point) => {
      return JSON.stringify(formatDate(point));
    });
  };

  return (
    <>
      <h3>Log Hours</h3>
      <PaddedContent>
        <Description>
          <>WIP: Here you can log your hours</>
        </Description>
      </PaddedContent>
      <Divider light />
      <PaddedContent>
        <S.Points>
          {checkpoints.map((point, index) => {
            const previousPoint = checkpoints[index - 1]
              ? checkpoints[index - 1].date.start
              : point.date.start;

            return RenderReactElementFromMap(
              <S.PointLine>
                <S.FirstCol>
                  <GS.React>
                    {formatDate(point.date.start, {
                      format: Enum_FormatDate.exactTime,
                    })}
                  </GS.React>{' '}
                  -{' '}
                  {point.date.end ? (
                    <GS.Js>
                      {formatDate(point.date.end, {
                        format: Enum_FormatDate.exactTime,
                      })}
                    </GS.Js>
                  ) : (
                    <AppLoaderIcon />
                  )}
                </S.FirstCol>
                <GS.Terminal>
                  <TextField
                    fullWidth
                    id="description"
                    type="description"
                    label="Task description"
                    defaultValue={point?.description}
                  />
                </GS.Terminal>
                <CopyToClipboardButton contentToCopy={() => alert('copy2')} />
              </S.PointLine>,
              index
            );
          })}
        </S.Points>
      </PaddedContent>
      <br />
      <br />
      <br />
      <S.CheckpointAction>
        <div>
          <Button
            color="primary"
            onClick={() => {
              const newTime = new Date();
              const newPoint: ICheckpoint = {
                date: {
                  start: newTime,
                  end: null,
                },
                description: '',
              };
              setFlipFlop(!flipFlop);
              addCheckpoint(newPoint);
            }}
          >
            Add Checkpoint
          </Button>
        </div>
        <div>
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              clearCheckpoints();
            }}
          >
            Clear Checkpoint
          </Button>
        </div>
      </S.CheckpointAction>
    </>
  );
};

export default HourLogging;
