import React, { useEffect, useState } from 'react'
import { Mutation } from "react-apollo";
import { Input, Icon } from "antd";
import { UPDATE_CARD } from '../../graphql/mutations'
import { GET_BOARD } from '../../graphql/queries';
import { CirclePicker } from 'react-color'
import styles from './styles.module.scss'

const COLORS = ['#42f4d9', '#6cef40', '#e87d2c', '#f25c9d']

export default function({ card, boardId, cardUpdated }) {
    const [ nameInputText, setNameInputText ] = useState('')
    const [ selectedColor, setSelectedColor ] = useState(COLORS[0])
    useEffect(() => {
        setNameInputText(card.name || '')
        setSelectedColor(card.color || COLORS[0])
    }, [])
    return (
        <Mutation
            mutation={UPDATE_CARD}
            variables={{ name: nameInputText, color: selectedColor, id: card.id }}
            refetchQueries={[{
                query: GET_BOARD,
                variables: { id: boardId }
            }]}
            awaitRefetchQueries={true}
        >
            {(updateCard, { loading, error }) => (
                <>
                    <Input.Search
                        autoFocus
                        disabled={loading}
                        onChange={event => setNameInputText(event.target.value)}
                        placeholder="Card name"
                        onSearch={() => updateCard().then(cardUpdated)}
                        value={nameInputText}
                        enterButton={loading ? <Icon type="loading" /> : "Update"}
                    />
                    <div className={styles['color-picker__container']}>
                        <CirclePicker color={selectedColor} colors={COLORS} onChangeComplete={(c) => setSelectedColor(c.hex)}/>
                    </div>
                </>
            )}
        </Mutation>
    )
}