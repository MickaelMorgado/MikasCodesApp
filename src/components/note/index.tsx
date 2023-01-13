import React from "react";
import ReactMarkdown from 'react-markdown'
import {
  Button,
  IconButton,
  Paper,
  Tooltip
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import * as S from './styles'
import { formatDate } from "utils";
import ResponsiveDialog from "components/responsiveDialog";

export interface INoteProps {
  id: string,
  date: Date,
  content: string,
  editCallback: (e: React.ChangeEvent<HTMLInputElement>) => void,
  deleteCallBack: (id: string) => void
}

export const Note = (props: INoteProps) => {

  const {
    id,
    date,
    content,
    editCallback,
    deleteCallBack
  } = props

  return (
    <Paper>
      <S.Wrapper>
        <>
          <S.Date>{formatDate(date)}</S.Date>
          <S.Content>
            <ReactMarkdown>{content ? content : ""}</ReactMarkdown>
          </S.Content>
          <S.Action>
            <ResponsiveDialog
              note={props}
              acceptedCallback={e => editCallback(e)}
              rejectedCallback={() => {}}
              children={
                <IconButton
                  color="primary"
                  size="small"
                >
                  <Edit />
                </IconButton>
              }
            />
            <IconButton
              color="primary"
              size="small"
              onClick={() => deleteCallBack(id)}
            >
              <Delete />
            </IconButton>
          </S.Action>
        </>
      </S.Wrapper>
    </Paper>
  )
};

export default Note;
