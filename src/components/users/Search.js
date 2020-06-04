import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ searchUser, setAlert, showClear, clearUsers }) => {
  const [text, setText] = useState('');

  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setAlert('Please enter something', 'light');
    } else {
      searchUser(text);
      setText('');
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={onChange} />
        <button type="submit" className="btn btn-dark btn-block">
          Search
        </button>
      </form>
      {showClear && (
        <button
          className="btn btn-light btn-block"
          onClick={ clearUsers }>
          Clear
        </button>
      )}
    </div>
  )
}

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search
