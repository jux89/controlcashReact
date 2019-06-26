import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/spends/mainSpend';
import Spend from './pages/spends/mainSpend';
import CreateSpend from './pages/spends/createSpend';
import EditSpend from './pages/spends/editSpend';
import DeleteSpend from './pages/spends/deleteSpend';


import Category from './pages/categories/mainCategory';
import CreateCategory from './pages/categories/createCategory';
import DeleteCategory from './pages/categories/deleteCategory';
import EditCategory from './pages/categories/editCategory';

import User from './pages/users/mainUser';
import CreateUser from './pages/users/createUser';
import DeleteUser from './pages/users/deleteUser';
import EditUser from './pages/users/editUser';

const Routes = () => (
    
    <BrowserRouter>
        <Switch>
        <Route exact path = "/" component={Main} />
            <Route path = "/spends/:id" component={Spend} />
            <Route path = "/createSpend/" component={CreateSpend} />
            <Route path = "/deleteSpend/:id" component={DeleteSpend} />
            <Route path = "/editSpend/:id" component={EditSpend} />
            <Route path = "/categories/:id" component={Category} />
            <Route path = "/createCategory/" component={CreateCategory} />
            <Route path = "/deleteCategory/:id" component={DeleteCategory} />
            <Route path = "/editCategory/:id" component={EditCategory} />
            <Route path = "/users/:id" component={User} />
            <Route path = "/createUser/" component={CreateUser} />
            <Route path = "/deleteUser/:id" component={DeleteUser} />
            <Route path = "/editUser/:id" component={EditUser} />
        </Switch>
    </BrowserRouter>
)

export default Routes;