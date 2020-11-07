import React from 'react'

export const RowRol = ({id,nombre}) => {
    return (
        <div>
            <tr>
                <td>{id}</td>
                <td>{nombre}</td>
            </tr>
        </div>
    )
}

