import React from 'react'
import { graphql } from 'react-apollo'
import { Row, Col, Card } from 'antd'
import { compose } from 'recompose'
import styles from './styles.module.scss'
import AddBoard from './addboard'
import Board from './board'
import { GET_USER_BOARDS, GET_USER_ID } from '../../graphql/queries';

function LoadingBoards() {
    return (
        <div className={styles['grid-container']}>
            <Row gutter={16}>
                {[1,2,3, 4].map(_ =>
                    <Col span={6}>
                        <Card loading={true} />
                    </Col>
                )}
            </Row>
        </div>
    )
}

function Boards(props) {
    const { data: { loading, error, getBoardsForUser, variables } } = props
    if (loading) return <LoadingBoards />
    if (!!error) return <div>Error loading</div>

    const { userId } = variables

    return (
        <div className={styles['grid-container']}>
            <Row gutter={16}>
                {getBoardsForUser.map(board => 
                    <Col span={6} style={{ paddingBottom: '10px' }}>
                        <Board board={board}/>
                    </Col>
                )}
            </Row>
            <AddBoard userId={userId}/>
        </div>
    )
}

export default compose(
    graphql(GET_USER_ID),
    graphql(GET_USER_BOARDS, {
        options: ({ data }: any) => ({ variables: { userId: data.userId }})
    }),
)(Boards)
