import React from 'react'

const NotesList = ({ notes }) => (
  <ul className="list-group">
    {notes.map((note, index) => ( // parens allow JSX return not on same line
      <li className="list-group-item" key={index}>{note}</li>
    ))}
  </ul>
)

// have to add propTypes as a property of the class or function after-the-fact
NotesList.propTypes = {
  notes: React.PropTypes.array.isRequired,
}

export default NotesList
