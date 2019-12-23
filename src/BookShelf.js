import React, {Component} from 'react';
import Book from './BookCard'
import PropTypes from 'prop-types'


/**
 * Component displays the list of books according to the types of shelf the books are tagged 
 * Four props are needed to use this class :
 * - the books array
 * - the shelf => can be any of shelves array items from App.js or SEARCH to display the book in search result
 * - allShelves => is the props containing the shelves options (to display the options and option 'selected' with matching book shelf param )
 * - the callback function to update the data to the server
 */

class BookShelf extends Component {



   /* handleSelectChange = (e) => {
        this.props.books.map( book => {
            if (book.id === e.target.id){ 
                this.props.moveBookHandler(book, e.target.value) // callBack function to update the book move
            }
            return false;  
        } )
    }*/


    render() {
        const { moveBookHandler, books, shelf, allShelves, findBookOnShelf } = this.props;        
        return (
            <ol className="books-grid">
                { books.map( (book) => (
                    (book.shelf === shelf || shelf === 'search' )&&   
                    <Book 
                        key={book.id}
                        books={books}
                        book={book}
                        shelf={shelf}
                        allShelves={allShelves}
                        findBookOnShelf={findBookOnShelf}
                        moveBookHandler = {moveBookHandler}
                    />
                    ))
                }
            </ol>
        )
    }


}


BookShelf.propTypes = {
    moveBookHandler: PropTypes.func.isRequired,
    books: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    allShelves: PropTypes.array.isRequired,
    findBookOnShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
}


export default BookShelf;