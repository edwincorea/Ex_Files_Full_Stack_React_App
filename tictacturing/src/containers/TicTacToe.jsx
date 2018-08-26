import React, { Component } from 'react'
import { Stage } from 'react-konva'

class TicTacToe extends Component {

    state = {
        rows: 3
    }

    componentWillMount() {
        let height = window.innerHeight
        let width = window.innerWidth
        let size = (height < width) ? height * .8 : width * .8
        let rows = this.state.rows
        let unit = size / rows

        this.setState({
            size, 
            rows,
            unit
        })
    }

    move = () => {

    }

    makeAiMove = () => {

    }

    turingTest = () => {

    }

    recordGame = () => {

    }

    render() {
        return (
            <div>
                <Stage
                    width={1}
                    height={1}
                >
                    {/* <Board/> */}
                    {/* <Squares/> */}
                </Stage>
            </div>
        )
    }
}

export default TicTacToe