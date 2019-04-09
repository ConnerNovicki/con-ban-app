import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import * as jwt from 'jsonwebtoken'
import { ApolloConsumer } from 'react-apollo';

const KEY = 'SUPER_SECRET_KEY'

const isValidJwt = (token) => {
    return !!token && jwt.verify(token, KEY)
}

function ProtectedRoute({ component: Component, client, ...rest }) {
    const token = localStorage.getItem('xtoken')
    const jwtPayload = isValidJwt(token)
    if (!jwtPayload) {
        return <Route {...rest} render={(props) => <Redirect to='/login' />} />
    }

    const { userId } = jwtPayload
    client.cache.writeData({ data: { userId } })

    return (
        <Route {...rest} render={(props) => <Component {...props} />} />
    )
}

export default (props) => (
    <ApolloConsumer>
        {(client) => <ProtectedRoute {...props} client={client}/>}
    </ApolloConsumer>
)
