import React from 'react'
import { Layout, Button, Row, Col, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';

export default withRouter(function({ history }) {
    const signOut = () => {
        localStorage.removeItem('xtoken')
        history.push('/login')
    }
    return (
        <Layout.Header>
            <Row type="flex" justify="space-between">
                <Col span={4}>
                    <Link to="/boards">
                        <Button>
                            <Icon type="home" />
                        </Button>
                    </Link>
                </Col>
                <Col span={4}>
                    <Button onClick={signOut}>Sign out</Button>
                </Col>
            </Row>
        </Layout.Header>
    )
})