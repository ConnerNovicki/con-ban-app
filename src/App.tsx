import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import Login from './components/Login'
import Boards from './components/Boards'
import ProtectedRoute from './protected-route'
import './App.scss';
import Header from './components/Header'
import Footer from './components/Footer'
import Board from './components/Board--single';

export default function() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Layout style={{ height: '100%' }}>
                        <Header/>
                        <Layout.Content>
                            <Route path="/" exact render={() => <Redirect to="/boards" />} />
                            <ProtectedRoute path="/board/:id" component={Board} />
                            <ProtectedRoute path="/boards" component={Boards} />
                        </Layout.Content>
                        <Footer></Footer>
                    </Layout>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
