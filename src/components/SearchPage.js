import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

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
            <DebounceInput 
              minLength={2}
              debounceTimeout={300}
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
                <Book 
                  book={result}
                  updateShelf={this.props.updateShelf}
                  shelf={bookShelf}
                />
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