import React from 'react';

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  onChange = (e) => {
    this.setState({ content: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { content } = this.state;
    if (content.trim()) {
      this.props.onAdd(content);
      this.setState({ content: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Новая заметка"
          value={this.state.content}
          onChange={this.onChange}
        />
        <button type="submit">Добавить</button>
      </form>
    );
  }
}
