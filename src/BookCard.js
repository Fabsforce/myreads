import React, {Component} from 'react';
import PropTypes from 'prop-types'



/**
 * Component displays the list of books according to the types of shelf the books are tagged 
 * Four props are needed to use this class :
 * - the books array
 * - the shelf => can be any of shelves array items from App.js or SEARCH to display the book in search result
 * - allShelves => is the props containing the shelves options (to display the options and option 'selected' with matching book shelf param )
 * - the callback function to update the data to the server
 */

class BookCard extends Component {

    handleSelectChange = (e) => {
        this.props.books.map( book => {
            if (book.id === e.target.id){ 
                this.props.moveBookHandler(book, e.target.value) // callBack function to update the book move
            }
            return false;  
        } )
    }


    render() {
        const {book,allShelves, findBookOnShelf } = this.props;        
        return (
            <li key={book.id} >
                        <div className="book">
                        <div className="book-top">
                            { 
                            book.imageLinks !== undefined ?
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+ book.imageLinks.smallThumbnail+')' }}></div>
                            : <div className="book-cover" style={{ width: 128, height: 193, padding: 25, }}>No Image Available</div>
                            }
                            <div className="book-shelf-changer">
                            <select onChange={this.handleSelectChange} 
                                    id={book.id} 
                                    value={ findBookOnShelf(book.id) }>
                                <option value="move" disabled>Move to...</option>
                                {  
                                    allShelves.map( (shelfOption) => (
                                        <option value={shelfOption.shelfType}  
                                                key={shelfOption.shelfType} 
                                                > {shelfOption.shelfTitle} </option>
                                    ) )
                                }
                            </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{ book.authors !== undefined ? book.authors.join(', ') : 'Author : unknown'  }</div>
                        </div>
                    </li>
        )
    }



}

BookCard.propTypes = {
    book: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    allShelves: PropTypes.array.isRequired,
    findBookOnShelf: PropTypes.func.isRequired,
}


export default BookCard;