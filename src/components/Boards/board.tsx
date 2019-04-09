import React from 'react'
import { Card, Button, Icon } from 'antd'
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import { GET_USER_BOARDS, GET_USER_ID } from '../../graphql/queries'
import { DELETE_USER_BOARD } from '../../graphql/mutations'
import styles from './styles.module.scss'

export default function({ board }) {
    return (
        <Query query={GET_USER_ID}>
            {({ data: { userId } }) => (
                <Mutation
                    mutation={DELETE_USER_BOARD}
                    variables={{ boardId: board.id }}
                    refetchQueries={[{
                        query: GET_USER_BOARDS,
                        variables: { userId }
                    }]}
                    awaitRefetchQueries={true}
                >
                    {(deleteBoard, { loading, error }) => (
                        <Card
                            loading={loading}
                            title={board.name}
                            bordered={false}
                            extra={
                                <Button onClick={() => deleteBoard()}>
                                    <Icon type="close" />
                                </Button>
                            }
                            className={loading ? styles['board--deleting'] : ''}
                        >
                            <Button>
                                <Link to={`/board/${board.id}`}>
                                    Go to board
                                </Link>
                            </Button>
                            {loading &&
                                <Icon type="loading" className={styles['card--deleting__spinner']}/>
                            }
                        </Card>
                    )
                }
                </Mutation>

            )}
        </Query>
    )
}