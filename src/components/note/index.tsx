import React from "react";
import {
  Button,
  Paper,
  Tooltip
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import * as S from './styles'
import { formatDate } from "utils";

export interface INoteProps {
  id: string,
  date: Date,
  content: string,
  deleteCallBack: (id: string) => {}
}

export const Note = ({
  id,
  date,
  content,
  deleteCallBack
}: INoteProps) => {
  return (
    <Paper>
      <S.Wrapper>
        <>
          <S.Date>{formatDate(date)}</S.Date>
          <S.Content>{content}</S.Content>
          <S.Action>
            <Button onClick={() => deleteCallBack(id)}>
              <Delete />
            </Button>
          </S.Action>
        </>
      </S.Wrapper>
    </Paper>
  )
};

export default Note;
