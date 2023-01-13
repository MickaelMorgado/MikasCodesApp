import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import MyFormField, { Enum_MyFormFieldType } from "components/myForm/field"
import PaddedContent from "components/paddedContent";
import { Enum_FormatDate, formatDate, RenderReactElementFromMap } from 'utils';

import * as S from "./styles";
import * as GS from "../globalStyles";
import CopyToClipboardButton from 'components/CopyToClipboardButton';

export interface IHourLoggingProps {
  id: string;
}

export interface ICheckpoint {
  date: Date;
  description: string;
}

export const HourLogging = ({ id }: IHourLoggingProps) => {
  const [checkpoints, setCheckpoints] = useState<ICheckpoint[]>([])
  const [checkpointsToString, setCheckpointsToString] = useState<string>("")
  const [flipFlop, setFlipFlop] = useState(true)

  const addCheckpoint = (checkpoint: ICheckpoint) => {
    setCheckpoints(prevState => ([
      ...prevState,
      checkpoint
    ]))
  }

  const clearCheckpoints = () => {
    setCheckpoints([])
  }

  const stringifyCheckpoints = (checkpoints: [], newTime: Date) => {
    checkpoints
      .map(point => {
        setCheckpointsToString(checkpointsToString + " - " + formatDate(point))
      })
  }

  const renderCheckpoints = (checkpoints: []) => {
    let template = <></>
    checkpoints
      .map(point => {
        return JSON.stringify(formatDate(point))
      })

  }

  return (
    <>
      <Button
        onClick={() => {
          const newTime = new Date()
          const newPoint: ICheckpoint = {
            date: newTime,
            description: "N/D"
          }
          setFlipFlop(!flipFlop)
          if (flipFlop) {
            console.log("start", flipFlop)
          } else {
            console.log("end", flipFlop)
          }
          addCheckpoint(newPoint)
        }}
      >Timer Checkpoint</Button>
      <br />
      <PaddedContent>
        <S.Points>
          {checkpoints
            .map(
              (point, index) => {
                const previousPoint = checkpoints[index-1] ? checkpoints[index-1].date : point.date

                return RenderReactElementFromMap(
                  <S.PointLine>
                    <div>
                      <GS.React>
                        {formatDate(previousPoint, {format: Enum_FormatDate.timeOnly})}
                      </GS.React> - <GS.Js>
                        {formatDate(point.date, {format: Enum_FormatDate.timeOnly})}
                      </GS.Js>
                    </div>
                    <GS.Terminal>
                      <TextField
                        fullWidth
                        id="description"
                        type='description'
                        label="Task description"
                        defaultValue={point?.description}
                      />
                    </GS.Terminal>
                    <CopyToClipboardButton
                      contentToCopy={() => alert("copy2")}
                    />
                  </S.PointLine>,
                  index
                )
              }
            )
          }
        </S.Points>
      </PaddedContent>
      <Button
        onClick={() => {clearCheckpoints()}}
      >Clear Checkpoint</Button>
    </>
  );
};

export default HourLogging;
