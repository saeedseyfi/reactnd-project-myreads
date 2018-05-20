import React from 'react'
import {Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import ROUTES from '../constsnts/routes';
// import * as BooksAPI from '../utils/BooksAPI'
import './App.css'

function BooksApp() {
    return (
        <div className="app">
            <Route exact path={ROUTES.HOME} component={ListBooks}/>
            <Route path={ROUTES.SEARCH} component={SearchBooks}/>
        </div>
    )
}

export default BooksApp
