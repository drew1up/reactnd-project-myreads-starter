import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {

	state = {
		query: '',
		results: []
	}

	updateQuery = query => {
		this.setState({ query })
		this.updateResults(query)
	}
	
	updateResults = query =>	{
		if(query) {
			BooksAPI.search(query).then(results => (
				results.error ? this.setState({ results: [] }) : this.setState({ results })
			))
		} else {
			this.setState({ results: [] });
		}
	}

	render() {

		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input 
            	type="text" 
            	placeholder="Search by title or author"
            	value={this.state.query}
            	onChange={e => this.updateQuery(e.target.value)}
          	/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          	{this.state.results.map(result => {
          		let bookShelf = "none";
          		this.props.books.map(book => (
          			book.id === result.id ? bookShelf = book.shelf : ''
          		));
          		return(
          		<li key={result.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${result.imageLinks ? result.imageLinks.smallThumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                      <select value={bookShelf} onChange={e => this.props.updateShelf(result, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{result.title ? result.title : ''}</div>
                  <div className="book-authors">{result.authors ? result.authors.map(author => <p>{author}</p>) : ''}</div>
                </div>
              </li>
          	)})
          	}
          </ol>
        </div>
      </div>
		)
	}
}

export default SearchPage;