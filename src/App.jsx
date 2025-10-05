import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';

const API_URL = 'http://localhost:7070/notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => setNotes(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = (content) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 0, content })
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка при добавлении');
        fetchNotes();
      })
      .catch(err => alert(err.message));
  };

  const deleteNote = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка при удалении');
        fetchNotes();
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="app">
      <h1>CRUD: Заметки</h1>
      <button onClick={fetchNotes} className="btn-refresh">⟳ Обновить</button>
      <NoteForm onAdd={addNote} />
      {loading && <p>Загрузка...</p>}
      {error && <p style={{color:'red'}}>Ошибка: {error}</p>}
      <div className="note-list">
        {notes.map(note => <NoteCard key={note.id} note={note} onDelete={deleteNote} />)}
      </div>
    </div>
  );
}
