import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const [text, setText] = useState('');

  const { searchUsers, clearUsers, showClear } = githubContext; 

  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
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

export default Search
