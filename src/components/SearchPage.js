import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchPage extends Component {

	state = {
		query: ''
	}

	updateQuery = query => {
		this.setState({ query })
	}

	clearQuery = () => {
		this.setState({ query: '' });
	}


	render() {
		const { query } = this.state;
		const { books } = this.props;

		let searchedBooks;
		if(query) {
			const match = new RegExp(escapeRegExp(query), 'i');
			searchedBooks = books.filter(book => match.test([book.title, book.authors, book.categories]))
		} else {
			searchedBooks = books
		}

		searchedBooks.sort(sortBy('title'));

		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input 
            	type="text" 
            	placeholder="Search by title or author"
            	value={query}
            	onChange={e => this.updateQuery(e.target.value)}
          	/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          	{searchedBooks.map(book => (
          		<li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={e => this.props.updateShelf(book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.map(author => `${author}`)}</div>
                </div>
              </li>
          	))}
          </ol>
        </div>
      </div>
		)
	}
}

export default SearchPage;