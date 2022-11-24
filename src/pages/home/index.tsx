import React, { useState } from "react";
import { Button, Divider, imageListItemBarClasses, Paper, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import MyFormField from "components/myForm/field";

import { randomizedId } from '../../utils/'
import Note from "components/note";

export interface INote {
  id: string,
  content: string
}

export interface IHomeProps {}

export const Home = () => {
  const [notes, setNotes] = useState<INote[]>([])
  const [currentNote, setCurrentNote] = useState('') 

  const addNote = (newNote: INote) => {
    setNotes([...notes, newNote])
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
  }

  return (
    <>
      <h3>Handy clipboard notes</h3>
      <Divider light />
      <br />
      <MyFormField
        variableName={'Note content'}
        callback={(e) => setCurrentNote(e.target.value)}
      />
      <Button variant="contained" onClick={() => handleAddNote()}>
        <Add />
      </Button>
      <br />
      <br />
      <Divider light />
      <br />
      <Stack spacing={2}>
        {notes.map(item => <Note id={item.id} content={item.content} deleteCallBack={(id) => handleDeleteNote(id)} />)}
      </Stack>
    </>
  );
};

export default Home;
