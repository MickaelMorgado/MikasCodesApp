import React from "react";
import { Button, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";

import * as S from './styles'

export interface INoteProps {
  id: string,
  content: string,
  deleteCallBack: (id: string) => {}
}

export const Note = ({
  id,
  content,
  deleteCallBack
}: INoteProps) => {
  return (
    <Paper>
      <S.Wrapper>
        <S.Content>{content}</S.Content>
        <S.Action>
          <Button onClick={() => deleteCallBack(id)}>
            <Delete />
          </Button>
        </S.Action>
      </S.Wrapper>
    </Paper>
  )
};

export default Note;
