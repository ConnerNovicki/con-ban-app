import React, { useState } from 'react'
import { Button, Input, Card, Icon } from 'antd';
import { Mutation } from 'react-apollo';
import { CREATE_COLUMN } from '../../graphql/mutations';
import { GET_BOARD } from '../../graphql/queries';

export default function({ boardId }) {
    const [ isAddingColumn, setIsAddingColumn ] = useState(false)
    const [ nameInputText, setNameInputText ] = useState('')

    const resetCreateColumn = () => {
        setIsAddingColumn(false)
        setNameInputText('')
    }

    return (
        <Mutation
            mutation={CREATE_COLUMN}
            variables={{ name: nameInputText, boardId }}
            awaitRefetchQueries={true}
            refetchQueries={[{
                query: GET_BOARD,
                variables: { id: boardId }
            }]}
        >
            {(addColumn, { loading, error }) => (
                <>
                {isAddingColumn &&
                    <Card>
                        <Input.Search
                            autoFocus
                            disabled={loading}
                            placeholder="Column name"
                            value={nameInputText}
                            onChange={(e) => setNameInputText(e.target.value)}
                            onSearch={() => addColumn().then(resetCreateColumn)}
                            enterButton={loading ? <Icon type="loading" /> : "Create"}
                        />
                    </Card>
                    ||
                    <Button type="dashed" block onClick={() => setIsAddingColumn(true)}>Add Column</Button>
                }
                </>
            )}
        </Mutation>
    )
}