import React from 'react'
import { Query } from 'react-apollo'
import { Icon, Row, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import AddColumn from './create-column'
import { GET_BOARD } from '../../graphql/queries'
import BoardColumn from './board-column'

function BoardSingle(props) {
    const boardId = props.location.pathname.split('/')[2]
    return (
        <Query query={GET_BOARD} variables={{ id: boardId }}>
        {({ data, error, loading }) => {
            if (loading) return <Icon type="loading" />
            if (!!error) return <div>Error loading</div>

            const { getBoard } = data
            const { id, name, columns } = getBoard
            return (
                <div>
                    <h1 style={{ padding: '1rem' }}>{name}</h1>
                    <Row gutter={10}>
                        {!!columns &&
                            columns.map((column: any) => <BoardColumn column={column} boardId={boardId}/> )
                        }
                        {!!columns && columns.length < 4 &&
                            <Col span={6}>
                                <AddColumn boardId={boardId} />
                            </Col>
                        }
                    </Row>
                </div>
            )
        }}
        </Query>
    )
}

export default withRouter(BoardSingle)