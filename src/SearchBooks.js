import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {

  state = {
    query : '',
    books : []
  }

  updateQuery = (query) => {
    // Update state.query on chance in order
    // to get that value on the input below
    // and then use it on the the search
  	this.setState({ query : query.trim() })

    if (query) {
    	BooksAPI.search(query, 20).then((books) => {
        // responses with no books has a error property

				if (!books.error) {
					this.setState({ books })
				}
    	})
    }
  }

  updateShelf = () => {
    if (this.props.onChangeShelf)
          this.props.onChangeShelf()
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/">Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id}>
                <Book
                  book={book}
                  onChangeShelf={() => this.updateShelf()}
                />
              </li>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
