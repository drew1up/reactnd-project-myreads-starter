import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'

class BooksApp extends Component {
  state = {
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
        this.setState({ books })
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




