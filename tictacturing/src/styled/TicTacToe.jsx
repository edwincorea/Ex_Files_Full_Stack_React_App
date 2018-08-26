import React from 'react'
import { Layer, Line } from 'react-konva'

export const Board = ({ size, rows, unit }) => {
    let grid = []
    let stroke = 'grey'
    let strokeWidth = 10
    
    for (let i = 1; i < rows; i++) {
        let position = unit * i
        // vertical line
        grid.push(
            <Line
                points={[position, 0, position, size]}
                stroke={stroke}
                strokeWidth={strokeWidth}
                key={i+'v'}
            >
            </Line>
        )
        // horizontal line
        grid.push(
            <Line
                points={[0, position, size, position]}
                stroke={stroke}
                strokeWidth={strokeWidth}
                key={i+'h'}
            >
            </Line>
        )
    }

    return (
        <Layer>
            {grid}
        </Layer>
    )
}