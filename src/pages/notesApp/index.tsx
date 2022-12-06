import React, { useState } from "react"
import { Button, Divider, Paper, Stack } from "@mui/material"
import { Add } from "@mui/icons-material"
import Masonry from '@mui/lab/Masonry'
import MyFormField, { Enum_MyFormFieldType } from "components/myForm/field"
import {
  Enum_StorageSlot,
  getLocalStorageItem,
  validation,
  randomizedId,
  setLocalStorageItem
} from '../../utils'
import Note from "components/note"
import PaddedContent from "components/paddedContent";
import Description from "components/description";

export interface INote {
  id: string,
  date: Date,
  content: string
}

export enum Enum_FilterBy {
  orderAZ = 'orderAZ',
  orderZA = 'orderZA',
  dateASC = 'dateASC',
  dateDESC = 'dateDESC'
}

export const NotesApp = () => {
  const getInitialNotes = getLocalStorageItem(Enum_StorageSlot.notes)
  // console.log('get initial notes: ', getInitialNotes)
  const [notes, setNotes] = useState<INote[]>(JSON.parse(getInitialNotes))
  const [currentNote, setCurrentNote] = useState('')
  const [filterBy, setFilterBy] = useState(Enum_FilterBy.dateDESC)

  const addNote = (newNote: INote) => {
    setNotes([...notes, newNote])
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify([...notes, newNote]))
  }

  const handleAddNote = () => {
    const newNote: INote = {
      id: randomizedId(),
      date: new Date,
      content: `${currentNote}`
    }
    addNote(newNote)
  }

  const handleDeleteNote = (id: string) => {
    const result = notes.filter((note) => note.id != id)
    setNotes(result)
    setLocalStorageItem(Enum_StorageSlot.notes, JSON.stringify(result))
  }

  const renderNotes = (orderType: Enum_FilterBy) => {
    switch (orderType) {
      case Enum_FilterBy.dateDESC:
        notes.sort((n1, n2) => (n1.date < n2.date) ? 1 : (n1.date > n2.date) ? -1 : 0) // Order by Date
        break;
      case Enum_FilterBy.dateASC:
        notes.sort((n1, n2) => (n1.date > n2.date) ? 1 : (n1.date < n2.date) ? -1 : 0) // Order by Date
        break;
      case Enum_FilterBy.orderZA:
        notes.sort((n1, n2) => (n1.content < n2.content) ? 1 : (n1.content > n2.content) ? -1 : 0) // Order by Content
        break;
        case Enum_FilterBy.orderAZ:
        notes.sort((n1, n2) => (n1.content > n2.content) ? 1 : (n1.content < n2.content) ? -1 : 0) // Order by Content
        break;
      default:
        // any code
        break;
    }

    return notes
      .map(item => <Note
        key={item.id}
        id={item.id}
        date={item.date}
        content={item.content}
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
      <PaddedContent>
        <MyFormField
          name='Filter by'
          formFieldType={Enum_MyFormFieldType.select}
          options={Enum_FilterBy}
          defaultValue={filterBy ? filterBy : Enum_FilterBy.dateDESC}
          callBack={(e) => setFilterBy(e.target.value)}
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
