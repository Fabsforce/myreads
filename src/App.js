import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


/**
 * This shelves constant defines the shelves types
 * and order defined for this project
*/
const shelves = [
  { shelfType: 'currentlyReading', shelfTitle: 'Currently Reading' },
  { shelfType: 'wantToRead', shelfTitle: 'Want To Read' },
  { shelfType: 'read', shelfTitle: 'Read' },
  { shelfType: 'none', shelfTitle: 'None' },
];


/**
 * Main component of the app
 */
class App extends React.Component {
    
    state = {
      books: [],
      loading: true,
      searchBooks: [],
      searchQuery:''
    }



  componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ 
                books: books,
                loading: false,
                searchBooks: [],
                searchQuery: '',
              })
        })
  }


  // Move book to shelf or none; update both the server data and the state of books array
  moveBookHandler = (book, shelfCat) => {
          
          this.setState({loading:true,})

          BooksAPI.update(book, shelfCat).then( (response) =>{
                /** CASE 1 : book change from one shelf to the other (except none) 
                 * we check that in the update response, the book is in the right shelf
                 * */ 
                if ( shelfCat !== 'none') {
                  if( response[shelfCat].findIndex(obj => obj === book.id) > -1 ){ // book is here
                      BooksAPI.getAll().then((books) => {
                            this.setState({ books : books, loading: false, })
                      })
                  } else { // book is not found
                      alert('Something goes wrong. Please try again');
                      this.setState({loading:false,})
                  }
                }
                /** CASE 2 : book is remove from shelf (none)
                 * we check that in the update response, the book is not there anymore (in every shelf)
                 * */ 
                if ( shelfCat === 'none') {
                  const bookPresence = shelves.filter((shelf) => { 
                        if (shelf.shelfType !== 'none'){
                          if( response[shelf.shelfType].findIndex(obj => obj === book.id) > -1 ){  return true; }
                        }
                        return false;
                  })
                  //if the book is not inside the response anymore, we update the state else we show an error
                  if (bookPresence.length === 0 ){
                      BooksAPI.getAll().then((books) => {
                          this.setState({ books : books, loading: false, })
                      })
                  }else{
                      alert('Something goes wrong. Please try again');
                      this.setState({loading:false,})
                  }
                }
          }) // BooksAPI.update

  }



  // get Books from Api, matching the search query
  searchBooksHandler = (query) => {
      this.setState(() => ({
        searchQuery: query,
        loading: true,
      }))

      if(query.length>0){
          BooksAPI.search(query)
              .then( resultSearchBooks => {
                this.setState({ 
                  searchBooks: resultSearchBooks,
                  loading: false,
                })
          })
      } else {
        this.setState({ 
            searchBooks: [],
            loading: false,
        })
      }
  }



  // Search is over we get back to empty initial state 
  emptySearchResultState = (e) => {
    BooksAPI.getAll().then((books) => {
        this.setState({
              books: books,
              searchBooks: [],
              loading: false,
              searchQuery: ''
        })
      })
  }


   findBookOnShelf = (bookId) => {
          const objIndex = this.state.books.findIndex(obj => obj.id === bookId);
          if (objIndex > -1){
              return this.state.books[objIndex].shelf
          } else {
              return 'none';
          }
    }




  render() {
    return (
      <div className="app">

      { this.state.loading&&
        <div style={styles.spinner} >
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={0} //no timeout

          />
        </div>
      }
        <Route exact path='/search' render = { () => (
                <SearchBooks 
                  searchBooksHandler = {this.searchBooksHandler}
                  moveBookHandler = {this.moveBookHandler}
                  searchBooks = {this.state.searchBooks}
                  shelves = {shelves}
                  searchQuery = {this.state.searchQuery}
                  emptySearchResultState = {this.emptySearchResultState}
                  findBookOnShelf = {this.findBookOnShelf}
                />
        )}
        />
        <Route exact path='/'  render = { () => (
              <ListBooks 
                  myBooks = {this.state.books}
                  shelves = {shelves}
                  moveBookHandler = {this.moveBookHandler}
                  loading = {this.state.loading}
                  findBookOnShelf = {this.findBookOnShelf}
              />
        )}  
        />
      </div>
    )
  }
}


// Component Styles
const styles = {
  spinner : {
    position:'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '99'
  }
}





export default App
