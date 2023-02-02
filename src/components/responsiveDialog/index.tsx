import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { INoteProps } from 'components/note';
import {
  Enum_MyFormFieldTransformationType,
  Enum_MyFormFieldType,
  MyFormField,
} from 'components/myForm/field';

interface IResponsiveDialog {
  children: JSX.Element;
  note: INoteProps;
  acceptedCallback: (e: React.SyntheticEvent | undefined) => void;
  rejectedCallback: (e: React.SyntheticEvent | undefined) => void;
}

const ResponsiveDialog = ({
  children,
  note,
  acceptedCallback,
  rejectedCallback,
}: IResponsiveDialog) => {
  const [open, setOpen] = useState(false);
  const [tmpNewNote, setTmpNewNote] = useState<React.SyntheticEvent>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  // return accepted or rejected callback passing the event:
  const handleClose = (accepted: boolean, event?: React.SyntheticEvent) => {
    console.log('modal acceptance');
    console.log(accepted, event);
    accepted ? acceptedCallback(tmpNewNote) : rejectedCallback(tmpNewNote);
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{children}</div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{`Edit Note #${note.id}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <MyFormField
              formFieldType={Enum_MyFormFieldType.textArea}
              name="newNoteTextArea"
              defaultValue={note.content}
              transformationType={Enum_MyFormFieldTransformationType.default}
              callback={(e) => setTmpNewNote(e)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Disagree</Button>
          <Button onClick={() => handleClose(true, tmpNewNote)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;
