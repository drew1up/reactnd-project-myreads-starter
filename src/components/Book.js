import React, { Component } from 'react'

class Book extends Component {
	render() {
		let { book, updateShelf, shelf} = this.props
		return (
			<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})`}}></div>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={e => updateShelf(book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.map(author => <p>{author}</p>)}</div>
      </div>
		)
	}
}

export default Book