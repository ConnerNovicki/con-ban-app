import React, { useState } from 'react'
import { withRouter } from "react-router-dom";
import { Icon, Card } from 'antd';
import logo from '../../resources/conban-logo.png'
import LoginForm from './login'
import SignupForm from './signup'
import styles from './styles.module.scss'
import { Mutation } from "react-apollo";
import { SAVE_USER } from '../../graphql/mutations'

function CardActions(setSelectedPage) {
    return [
        <span onClick={() => setSelectedPage(0)}><Icon type="edit" />Login</span>,
        <span onClick={() => setSelectedPage(1)}><Icon type="edit" />Sign Up</span>
    ]
}

const PAGES = {
    login: 0,
    signup: 1,
}

function Login({ history }) {
    const [ selectedPage, setSelectedPage ] = useState(0)

    const handleLoginSuccess = (token, user, saveUser) => {
        localStorage.setItem('xtoken', token)
        history.push('/boards')
        saveUser({ variables: { user }})
    }

    return (
        <div className={styles['container']}>
            <Mutation mutation={SAVE_USER}>
                {saveUser => (
                    <Card className={styles['card']} actions={CardActions(setSelectedPage)}>
                        <img src={logo} className={styles['logo']}/>
                        {
                            selectedPage === PAGES.login
                                ? <LoginForm onLoginSuccess={(token, user) => handleLoginSuccess(token, user, saveUser)} />
                                : <SignupForm onSignupSuccess={(token, user) => handleLoginSuccess(token, user, saveUser)} />
                        }
                    </Card>
                )}
            </Mutation>
        </div>
    )
}

export default withRouter(Login)
