import React, { Component } from 'react'
import { Container, Name, GameListHeader, 
    GameList, GameRecord, Column, ColumnLabels } from '../styled/Profile'

class Profile extends Component {

    static defaultProps = {
        user: {
            email: 'USER_EMAIL',
            games: [
                {
                    winner: true,
                    createdAt: '08/24/2018',
                    id: '0001'
                },
                {
                    winner: false,
                    createdAt: '08/25/2018',
                    id: '0002'
                },
                {
                    winner: true,
                    createdAt: '08/26/2018',
                    id: '0003'
                }
            ]
        }
    }

    render() {
        let { email } = this.props.user
        return (
            <Container>
                <Name>
                    {email}
                </Name>
                <GameList>
                    <GameListHeader>
                        My Games
                    </GameListHeader>
                    <ColumnLabels>
                        <Column>
                        Outcome
                        </Column>
                        <Column>
                        Guess
                        </Column>
                        <Column>
                        Guessed Correctly
                        </Column>
                        <Column>
                        Date
                        </Column>
                    </ColumnLabels>
                </GameList>
            </Container>
        )
    }
}

export default Profile