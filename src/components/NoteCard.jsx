import React from 'react';

export default class NoteCard extends React.Component {
  render() {
    const { note, onDelete } = this.props;
    return (
      <div>
        <span>{note.content}</span>
        <button onClick={() => onDelete(note.id)}>Удалить</button>
      </div>
    );
  }
}
