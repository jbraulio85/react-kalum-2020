import React, { useState } from 'react'

export const TableRol = () => {

    const [roles,setRol] = useState ([]);
    
    return (
        <table className ="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                </tr>
            </thead>
                <tbody>
                    {roles.map(rol =>{<RowRol{...rol}/>})}
                </tbody>
        </table>
    )
}
