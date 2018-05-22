import React from 'react';
import {Route} from 'react-router-dom';
import ListBooks from '../ListBooks/index';
import SearchBooks from '../SearchBooks/index';
import ROUTES from '../../constsnts/routes';
import './index.css';

function BooksApp() {
    return (
        <div className="app">
            <Route
                exact
                path={ROUTES.LIST_BOOKS}
                component={ListBooks}/>
            <Route
                path={ROUTES.SEARCH}
                component={SearchBooks}/>
        </div>
    );
}

export default BooksApp;
