import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'


/**
 * SearchBooks component page
 */
class SearchBooks extends Component {

    handleClose = (e) => {
        this.props.emptySearchResultState();
    }


    render() {

       const { searchBooksHandler, moveBookHandler, searchBooks, shelves, searchQuery, findBookOnShelf  } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                  <Link className="close-search" to='/' onClick={this.handleClose}>
                    Close
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                        value={searchQuery}
                        onChange={(event) =>  searchBooksHandler(event.target.value)} />
                  </div>
                </div>
                <div className="search-books-results">

                {   
                    ( searchQuery.length > 0 && searchBooks.length >0 ) ?
                      <BookShelf 
                          key = 'search'
                          shelf = 'search'
                          searchBooks = {searchBooks}
                          allShelves = {shelves}
                          moveBookHandler = {moveBookHandler}
                          findBookOnShelf = {findBookOnShelf}
                          books = {searchBooks}
                      />
                    : searchQuery.length > 0 &&
                    <ol className="books-grid">Your query returned no result.</ol>
                }     

                </div>
              </div>
        )
    }



}



SearchBooks.propTypes = {
    searchBooksHandler: PropTypes.func.isRequired,
    moveBookHandler: PropTypes.func.isRequired,
    searchBooks: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    shelves: PropTypes.array.isRequired,
    searchQuery: PropTypes.string.isRequired,
    findBookOnShelf: PropTypes.func.isRequired,
  }




export default SearchBooks;