import React, {Component} from 'react';
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'



/**
 * ListBooks component page : List books in our shelves 
 */
class ListBooks extends Component {

    render() {

       const { myBooks,shelves, moveBookHandler, findBookOnShelf } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                
                {
                        shelves.map( shelf => (  
                            shelf.shelfType !== 'none'&&
                                <div className="bookshelf" key={shelf.shelfType}>
                                    <h2 className="bookshelf-title" >{shelf.shelfTitle}</h2>
                                        <div className="bookshelf-books">
                                         {myBooks.findIndex(obj => obj.shelf === shelf.shelfType) > -1 ? // check if there's any book in this shelf category
                                            <BookShelf 
                                                shelf = {shelf.shelfType}
                                                books = {myBooks}
                                                allShelves = {shelves}
                                                moveBookHandler = {moveBookHandler}
                                                findBookOnShelf = {findBookOnShelf}
                                                key = {shelf.shelfType}
                                            />
                                            : this.props.loading?
                                                    <p>Loading data, please wait...</p> // when page is loading or refresh this message is displayed
                                                :<p>You don't have any book in this shelf yet</p>  
                }                          
                                        </div>
                                </div>
                        ) )
                }

                </div>
                <div className="open-search">
                <Link to="/search" className="open-search-link">
                Add a book
                </Link>
                </div>
            </div>
        )
    }

}


ListBooks.propTypes = {
    moveBookHandler: PropTypes.func.isRequired,
    myBooks: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    shelves: PropTypes.array.isRequired,
    findBookOnShelf: PropTypes.func.isRequired,
}





export default ListBooks;