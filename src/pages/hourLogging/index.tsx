import { Button, Checkbox, Divider, TextField, Tooltip } from '@mui/material';
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
  isDone: boolean;
}

export const HourLogging = ({ id }: IHourLoggingProps) => {
  const [checkpoints, setCheckpoints] = useState<ICheckpoint[]>(
    JSON.parse(getLocalStorageItem(Enum_StorageSlot.hourLogs))
  );
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

  const handleChangeDescription = (e: any, checkpointIndex: number) => {
    const incomingText = e.target.value;
    checkpoints[checkpointIndex].description = incomingText;
    setCheckpoints((prevState) => {
      if (prevState.length !== 0) {
        const checkpointDescriptionModified = (prevState[
          checkpointIndex
        ].description = incomingText);
      }
      return [...prevState];
    });
  };

  const handleMarkAsDone = (condition: boolean, checkpointIndex: number) => {
    setCheckpoints((prevState) => {
      prevState[checkpointIndex].isDone = condition;
      return [...prevState];
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
            const logInfoDetails = `${formatDate(point.date.start, {
              format: Enum_FormatDate.timeOnly,
            })} - ${
              point.date.end !== null &&
              formatDate(point.date.end, {
                format: Enum_FormatDate.timeOnly,
              })
            }\n${point?.description}`;

            return RenderReactElementFromMap(
              <S.PointLine>
                <S.FirstCol>
                  <Checkbox checked={point.isDone} />
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
                    onChange={(e) => handleChangeDescription(e, index)}
                  />
                </GS.Terminal>
                <>
                  <Tooltip title={point?.description}>
                    <S.GeneratedLogDetails>
                      <>{logInfoDetails}</>
                    </S.GeneratedLogDetails>
                  </Tooltip>
                </>
                <CopyToClipboardButton
                  contentToCopy={logInfoDetails}
                  markAsDone={(condition) => handleMarkAsDone(condition, index)}
                />
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
                isDone: false,
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
