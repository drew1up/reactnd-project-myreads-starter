import React, { Component } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'
import NoMatch from './components/NoMatch'

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
      <Router>
        <div className="app">
          <Switch>
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
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp




