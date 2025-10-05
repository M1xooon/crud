import React, { useState } from 'react';

export default function NoteForm({ onAdd }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return alert('Введите текст заметки');
    onAdd(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Новая заметка" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Добавить</button>
    </form>
  );
}
