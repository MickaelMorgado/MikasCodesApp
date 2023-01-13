import React, { useState } from "react"
import { Button, Divider } from "@mui/material"
import { Add } from "@mui/icons-material"
import Masonry from '@mui/lab/Masonry'
import MyFormField, { Enum_MyFormFieldType } from "components/myForm/field"
import {
  Enum_StorageSlot,
  getLocalStorageItem,
  validation,
  randomizedId,
  setLocalStorageItem,
  sortBy
} from '../../utils'
import Note from "components/note"
import PaddedContent from "components/paddedContent";
import Description from "components/description";

export interface INote {
  id: string,
  date: Date,
  content: string
}

export const NotesApp = () => {
  const getInitialNotes = getLocalStorageItem(Enum_StorageSlot.notes)
  const [notes, setNotes] = useState<INote[]>(JSON.parse(getInitialNotes))
  const [newNoteContent, setNewNoteContent] = useState('')
  const [filterBy, setFilterBy] = useState(sortBy.dateDESC.value)

  const addNote = (newNote: INote) => {
    setNotes([...notes, newNote])
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify([...notes, newNote]))
  }

  const handleAddNote = () => {
    const newNote: INote = {
      id: randomizedId(),
      date: new Date,
      content: `${newNoteContent}`
    }
    addNote(newNote)
  }

  const updateNote = (currentNote: INote, newContent: string) => {
    const selectedNote = notes.filter(item => item.id == currentNote.id)[0]
    selectedNote.content = newContent
    setNotes([...notes])
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify([...notes]))
  }

  const handleDeleteNote = (id: string) => {
    const result = notes.filter((note) => note.id != id)
    setNotes(result)
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify(result))
  }

  const renderNotes = (item: string) => {
    switch (item) {
      case sortBy.dateDESC.value:
        notes.sort((n1, n2) => (n1.date < n2.date) ? 1 : (n1.date > n2.date) ? -1 : 0) // Order by Date
        break;
      case sortBy.dateASC.value:
        notes.sort((n1, n2) => (n1.date > n2.date) ? 1 : (n1.date < n2.date) ? -1 : 0) // Order by Date
        break;
      case sortBy.orderZA.value:
        notes.sort((n1, n2) => (n1.content < n2.content) ? 1 : (n1.content > n2.content) ? -1 : 0) // Order by Content
        break;
      case sortBy.orderAZ.value:
        notes.sort((n1, n2) => (n1.content > n2.content) ? 1 : (n1.content < n2.content) ? -1 : 0) // Order by Content
        break;
      default:
        // any code
        break;
    }

    return notes
      .map(note => <Note
        key={note.id}
        id={note.id}
        date={note.date}
        content={note.content}
        editCallback={
          (e: React.ChangeEvent<HTMLInputElement>) => {
            const newNoteContent = e.target.value ? e.target.value : ""
            updateNote(note, newNoteContent)
          }
        }
        deleteCallBack={(id) => handleDeleteNote(id)}
      />)
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
            callback={e => setNewNoteContent(e.target.value)}
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
        <MyFormField
          name='Filter by'
          formFieldType={Enum_MyFormFieldType.select}
          options={sortBy}
          defaultValue={filterBy ? filterBy : sortBy.dateDESC.value}
          callback={e => setFilterBy(e.target.value) }
        />
      </PaddedContent>
      <br />
      <Divider light />
      <br />
      <PaddedContent>
        <Masonry columns={2} spacing={2}>
          {validation.isValid(notes)
            ? <>{renderNotes(filterBy)}</>
            : validation.invalidMessage('No notes saved')
          }
        </Masonry>
      </PaddedContent>
    </>
  );
};
