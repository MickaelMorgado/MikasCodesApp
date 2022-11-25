import React, { useState } from "react";
import { Button, Divider, Stack } from "@mui/material"
import { Add } from "@mui/icons-material"
import MyFormField, { Enum_MyFormFieldType } from "components/myForm/field"
import {
  Enum_StorageSlot,
  getLocalStorageItem,
  randomizedId,
  setLocalStorageItem
} from '../../utils'
import Note from "components/note"
import PaddedContent from "components/paddedContent";
import Description from "components/description";

export interface INote {
  id: string,
  content: string
}

export interface INotesAppProps {}

export const NotesApp = () => {
  const getInitialNotes = getLocalStorageItem(Enum_StorageSlot.notes)
  console.log('get initial notes: ', getInitialNotes)
  const [notes, setNotes] = useState<INote[]>(JSON.parse(getInitialNotes))
  const [currentNote, setCurrentNote] = useState('')

  const addNote = (newNote: INote) => {
    setNotes([...notes, newNote])
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify([...notes, newNote]))
  }

  const handleAddNote = () => {
    const newNote: INote = {
      id: randomizedId(),
      content: `${currentNote}`
    }
    addNote(newNote)
  }

  const handleDeleteNote = (id: string) => {
    const result = notes.filter((note) => note.id != id)
    setNotes(result)
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify(result))
  }

  return (
    <>
      <h3>Handy clipboard notes</h3>
      <PaddedContent>
        <Description><>Here you can save any content as handy clipboards items</></Description>
      </PaddedContent>
      <Divider light />
      <br />
      <PaddedContent>
        <>
          <MyFormField
            name={'Note content'}
            formFieldType={Enum_MyFormFieldType.textArea}
            callBack={(e) => setCurrentNote(e.target.value)}
          />
          <Button variant="contained" onClick={() => handleAddNote()}>
            <Add />
          </Button>
        </>
      </PaddedContent>
      <br />
      <br />
      <Divider light />
      <br />
      <PaddedContent>
        <Stack spacing={2}>
          {notes
            .map(item => <Note
              key={item.id}
              id={item.id}
              content={item.content}
              deleteCallBack={(id) => handleDeleteNote(id)}
              />)
            }
        </Stack>
      </PaddedContent>
    </>
  );
};

export default NotesApp;
