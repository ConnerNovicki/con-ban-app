import React, { useState } from 'react'
import { Input, Button, Modal } from 'antd'
import { Mutation } from 'react-apollo';
import { CREATE_BOARD } from '../../graphql/mutations'
import { GET_USER_BOARDS } from '../../graphql/queries'

export default function({ userId }) {
    const [ inputText, setInputText ] = useState('')
    const [ isModalOpen, setIsModalOpen ] = useState(false)

    const resetAddBoard = () => {
        setIsModalOpen(false)
        setInputText('')
    }

    return (
        <Mutation
            mutation={CREATE_BOARD}
            variables={{ userId, name: inputText }}
            refetchQueries={[{
                query: GET_USER_BOARDS,
                variables: { userId }
            }]}
        >
            {(createBoard, { loading, error }) => (
                <>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>Add New Board</Button>
                    <Modal
                        title="Basic Modal"
                        visible={isModalOpen}
                        onOk={() => createBoard().then(resetAddBoard)}
                        confirmLoading={loading}
                        onCancel={() => setIsModalOpen(false)}
                    >
                        <Input
                            autoFocus
                            disabled={loading}
                            onPressEnter={() => createBoard().then(resetAddBoard)}
                            placeholder="Board name"
                            onChange={e => setInputText(e.target.value)}
                            value={inputText}
                        />
                    </Modal>
                </>
            )}
        </Mutation>
    )
}
