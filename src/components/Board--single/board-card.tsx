import React, { useState } from 'react'
import { Card, Button, Icon, Input } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import styles from './styles.module.scss'
import { Mutation } from 'react-apollo';
import { DELETE_CARD } from '../../graphql/mutations'
import { GET_BOARD } from '../../graphql/queries';
import UpdateCard from './update-card'

function BoardCard({ card, boardId }) {
    const [ updatingCard, setIsUpdatingCard ] = useState(false) 
    return (
        <Mutation mutation={DELETE_CARD} variables={{ id: card.id }} awaitRefetchQueries={true} refetchQueries={[{
            query: GET_BOARD,
            variables: { id: boardId }
        }]}>
            {(deleteCard, { loading, error }) => (
                <Card
                    loading={loading}
                    className={styles['card']}
                    style={{ borderLeft: `5px solid ${card.color}` }}
                >
                    {!updatingCard && (
                        <div className={styles['card__content']}>
                            <h3>{card.name}</h3>
                            <ButtonGroup>
                                <Button onClick={() => setIsUpdatingCard(true)}><Icon type="edit" theme="twoTone" /></Button>
                                <Button onClick={() => deleteCard()}><Icon type="delete" theme="twoTone" /></Button>
                            </ButtonGroup>
                        </div>
                    ) || (
                        <UpdateCard card={card} boardId={boardId} cardUpdated={() => setIsUpdatingCard(false)}/>
                    )}
                </Card>
            )}
         </Mutation>
    )
}

export default BoardCard