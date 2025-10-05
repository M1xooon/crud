import React from 'react';

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <span>{note.content}</span>
      <button onClick={() => onDelete(note.id)}>Удалить</button>
    </div>
  );
}
