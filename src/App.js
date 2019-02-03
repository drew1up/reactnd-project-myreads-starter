import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : []
  }


  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ 
        books: books
      });
    })
  }
  
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({books: books})
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf 
            books={this.state.books} 
            updateShelf={this.updateShelf} />
        )}/>
        <Route path="/search" render={() => (
          <SearchPage 
            books={this.state.books} 
            updateShelf={this.updateShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp




