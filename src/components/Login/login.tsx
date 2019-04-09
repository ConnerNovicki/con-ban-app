import React, { useState } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Input, Icon, Form } from 'antd';

const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
          id
          firstName
          lastName
      }
    }
  }
`;

function LoginForm({ form, onLoginSuccess }) {
    const { getFieldDecorator } = form
    const onSubmit = (e:any,loginUser: any) => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values
                loginUser({ variables: { username, password } })
            }
        })
    }
    return (
        <Mutation mutation={LOGIN_USER} onCompleted={(res) => onLoginSuccess(res.login.token, res.login.user)}>
            {(loginUser, { loading, error }) => (
                <div>
                    <Form onSubmit={(e) => onSubmit(e, loginUser)}>
                        <Form.Item>
                            <h2>Login</h2>
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your Username' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={loading}>
                            {loading ? <Icon type="loading" /> : 'Login'}
                            </Button>
                        </Form.Item>
                    </Form>
                    {error && <p>Error :( Please try again</p>}
                </div>
            )}
        </Mutation>
    )
}

export default Form.create({ name: 'login' })(LoginForm)
