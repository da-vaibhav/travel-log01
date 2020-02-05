import React from 'react';

export default function LogEntryForm() {
  return (
    <form className="entryForm">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required/>

      <label htmlFor="comments">Comments</label>
      <textarea rows={3} name="comments" />

      <label htmlFor="description">Description</label>
      <textarea rows={3} name="description" />

      <label htmlFor="image">image</label>
      <input type="text" name="image" />

      <label htmlFor="visitDate">visit date</label>
      <input type="date" name="visitDate" />
      <button>Create log entry</button>
    </form>
  )
}
