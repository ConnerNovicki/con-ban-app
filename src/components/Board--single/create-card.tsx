import React, { useState } from 'react'
import { Button, Input, Card, Icon } from 'antd';
import { CirclePicker } from 'react-color';
import { CREATE_CARD } from '../../graphql/mutations';
import { Mutation } from 'react-apollo';
import { GET_BOARD } from '../../graphql/queries';
import styles from './styles.module.scss'

const COLORS = ['#42f4d9', '#6cef40', '#e87d2c', '#f25c9d']

export default function({ columnId, boardId }) {
    const [ isAddingCard, setIsAddingCard ] = useState(false)
    const [ selectedColor, setSelectedColor ] = useState(COLORS[0])
    const [ nameInputText, setNameInputText ] = useState('')

    const resetCreateCard = () => {
        setIsAddingCard(false)
        setNameInputText('')
        setSelectedColor(COLORS[0])
    }

    return (
        <Mutation mutation={CREATE_CARD} variables={{name: nameInputText, color: selectedColor, columnId }} refetchQueries={[{ query: GET_BOARD, variables: { id: boardId } }]} awaitRefetchQueries={true}>
            {(createCard, { loading }) => (
                <>
                    {isAddingCard &&
                        <Card>
                            <Input.Search
                                autoFocus
                                disabled={loading}
                                onChange={event => setNameInputText(event.target.value)}
                                placeholder="Card name"
                                onSearch={() => createCard().then(resetCreateCard)}
                                value={nameInputText}
                                enterButton={loading ? <Icon type="loading" /> : "Create"}
                            />
                            <div className={styles['color-picker__container']}>
                                <CirclePicker color={selectedColor} colors={COLORS} onChangeComplete={(c) => setSelectedColor(c.hex)}/>
                            </div>
                        </Card>
                        ||
                        <Button type="dashed" block onClick={() => setIsAddingCard(true)}>Add Card</Button>
                    }
                </>
            )}
        </Mutation>
    )
}
