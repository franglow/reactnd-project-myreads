import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  state = {
    book : {}
  }

  handleChange = (shelfRequested,book) => {
    this.setState({book})
    BooksAPI.update(book,shelfRequested).then(updatedBooks => {
      if (this.props.onChangeShelf)
            this.props.onChangeShelf()
    })
  }

  render() {
    const { book } = this.props
    return(
      <div className="book">
        <div className="book-top">
          {((this.props.book.imageLinks) ?
                  <div
                      className="book-cover"
                      style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                  </div> :
                  <div className="book-cover">No Cover</div>
              )}
          <div className="book-shelf-changer">
            <select onClick={(e) => this.handleChange(e.target.value,book)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default Book
