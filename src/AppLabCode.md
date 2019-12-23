  
******************** EXPERIMENTAL CODE **********************
  
  // Move book to shelf or none; update both the server data and the state of books array
  moveBookHandler = (book, shelfCat) => {
          
    this.setState({loading:true,})

    BooksAPI.update(book, shelfCat).then( (response) =>{
        // we check that in the response the book is where it should be
        console.log(response[shelfCat].findIndex(obj => obj === '145'))
        if( response[shelfCat].findIndex(obj => obj === book.id) > -1 ){
            BooksAPI.getAll().then((books) => {
                  this.setState({ books : books, loading: false, })
            })
        } else {
            alert('Something goes wrong. Please try again');
            this.setState({loading:false,})
        }

    })

    /** This is a second mockup solution (I keep it for reference):
     * 1/ sending update to server 
     * 2/ verify response update contains the book
     * 3/ update the books state locally -> so to be faster and more responsive for user than getting the whole list of books again and wait again ...
     * Todo : handling the shelf change for non exsiting book on our shelf*/  
    /*BooksAPI.update(book, shelfCat).then( response => {
        // If this is a move to another shelf and not a remove (none)
        if (shelfCat !== 'none'){
            response[shelfCat].forEach( (element) => {
                // From the server response we get the id of the book to udpdate in books state
                if (element === book.id){
                    const objIndex = this.state.books.findIndex(obj => obj.id === book.id);
                    // Does this book is already in our books state array ?
                    if (objIndex > -1) {
                          const updatedBook = { ...this.state.books[objIndex], shelf: shelfCat}; //yes then we update its shelf
                          const updatedBooks = [
                            ...this.state.books.slice(0, objIndex),
                            updatedBook,
                            ...this.state.books.slice(objIndex + 1),
                          ];
                          this.setState( { books: updatedBooks})
                      // The book is not there, so we update the books array state in adding this book object
                      } else {
                         const newBooks = [...this.state.books,book];
                         this.setState( { books: newBooks})
                      }     
                }
              }
            )
          // The book is move to the 'none' shelf so we remove it from our books array
          } else {
              const objIndex = this.state.books.findIndex(obj => obj.id === book.id);
              const updatedBooks = [ ...this.state.books.slice(0,objIndex),...this.state.books.slice(objIndex + 1),];
              console.log( updatedBooks )
              this.setState( { books: updatedBooks})
          }
    })*/
}




if ( shelfCat === 'none') {
    let error = false;
    shelves.map( (shelfOption) => {   // we check the book presence in any shelf of update response
        if (shelfOption.shelfType !== 'none'){
            if( response[shelfOption.shelfType].findIndex(obj => obj === book.id) > -1 ){  error = true; }
        }
    })
    //if the book is not the response anymore we update the state else we show an error
    if (error === false ){
        BooksAPI.getAll().then((books) => {
            this.setState({ books : books, loading: false, })
        })
    }else{
        alert('Something goes wrong. Please try again');
        this.setState({loading:false,})
    }
  }