import React from 'react'
import { Mutation } from "react-apollo";
import { Button, Input, Icon, Form } from 'antd';
import { CREATE_USER } from '../../graphql/mutations'

function Signup({ form, onSignupSuccess }) {
    const { getFieldDecorator } = form
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
    const onSubmit = (e:any,createUser: any) => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                const { firstName, lastName, email, username, password } = values
                createUser({ variables: { firstName, lastName, email, username, password } })
            }
        })
    }

    return (
        <Mutation mutation={CREATE_USER} onCompleted={(res) => onSignupSuccess(res.createUser.token, res.createUser.user)}>
            {(createUser, { loading, error }) => (
                <div>
                    <Form onSubmit={(e) => onSubmit(e, createUser)} { ...formItemLayout }>
                        <Form.Item>
                            <h2>Sign Up</h2>
                        </Form.Item>
                        <Form.Item label="First Name">
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your Username' }],
                            })(
                                <Input placeholder="First Name" />
                            )}
                        </Form.Item>
                        <Form.Item label="Last Name">
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your Username' }],
                            })(
                                <Input placeholder="Last Name" />
                            )}
                        </Form.Item>
                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your Username' }],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Username">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your Username' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Password">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item label="Verify Password">
                            {getFieldDecorator('password-verify', {
                                rules: [{ required: true, message: 'Please input your Password' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={loading}>
                            {loading ? <Icon type="loading" /> : 'Sign Up'}
                            </Button>
                        </Form.Item>
                    </Form>
                    {error && <p>Error :( Please try again</p>}
                </div>
            )}
        </Mutation>
    )
}

export default Form.create({ name: 'login' })(Signup)
