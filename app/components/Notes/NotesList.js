import React from 'react'

const NotesList = ({ notes }) => (
  <ul className="list-group">
    {notes.map((note) => ( // parens allow JSX return not on same line
      <li key={note['.key']} className="list-group-item">{note['.value']}</li>
    ))}
  </ul>
)

// have to add propTypes as a property of the class or function after-the-fact
NotesList.propTypes = {
  notes: React.PropTypes.array.isRequired,
}

export default NotesList
