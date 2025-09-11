import React from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';

const API_URL = 'http://localhost:7070/notes';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], loading: false, error: null };
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = () => {
    this.setState({ loading: true, error: null });
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => this.setState({ notes: data, loading: false }))
      .catch((err) => this.setState({ error: err.message, loading: false }));
  };

  addNote = (content) => {
    const newNote = { content };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    })
      .then(() => this.fetchNotes())
      .catch((err) => alert('Ошибка при добавлении заметки: ' + err.message));
  };

  deleteNote = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => this.fetchNotes())
      .catch((err) => alert('Ошибка при удалении заметки: ' + err.message));
  };

  render() {
    const { notes, loading, error } = this.state;
    return (
      <div>
        <h1>Заметки</h1>
        <NoteForm onAdd={this.addNote} />
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
        <div>
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={this.deleteNote} />
          ))}
        </div>
      </div>
    );
  }
}
