import React from 'react'
import { Mutation } from "react-apollo";
import { Icon, Button, Card, Col, List } from "antd";
import { DELETE_COLUMN } from "../../graphql/mutations";
import CreateCard from './create-card'
import { GET_BOARD } from '../../graphql/queries';
import BoardCard from './board-card';

export default function({ column, boardId }) {
    return (
        <Mutation
            mutation={DELETE_COLUMN}
            variables={{ id: column.id }}
            awaitRefetchQueries={true}
            refetchQueries={[{ query: GET_BOARD, variables: { id: boardId } }]}
        >
            {(deleteColumn, { loading }) => (
                <Col span={6}>
                    <Card
                        loading={loading}
                        title={column.name}
                        extra={<Button onClick={() => deleteColumn()}><Icon type="close"/></Button>}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={column.cards}
                            renderItem={(card: any) => <BoardCard card={card} boardId={boardId} />}/>
                        <CreateCard columnId={column.id} boardId={boardId}/>
                    </Card>
                    {loading && <Icon type="loading" />}
                </Col>
            )}
        </Mutation>
    )
}