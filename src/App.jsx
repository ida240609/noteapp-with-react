import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import uuid from 'react-uuid'

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(false);

  // ローカルストレージ保存
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0].id);
  }, [notes]);

  const onAddNote = () => {
    console.log("新しくノートが追加されました");
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  // 修正された新しいノートの配列を返す
  const onUpdateNote = (updatedNote) => {
    const updatedNoteArray = notes.map((note) => {

      // これから編集するIDと等しい
      if(note.id === updatedNote.id) {
        // console.log(updatedNote);
        return updatedNote;

      } else {
        return note;
      }
    });

    setNotes(updatedNoteArray);
  }



  return (
    <div className='App'>
      <Sidebar 
        onAddNote={onAddNote} 
        notes={notes} 
        onDeleteNote={onDeleteNote} 
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App