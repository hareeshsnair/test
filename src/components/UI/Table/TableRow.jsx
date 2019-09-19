import React from 'react'

export default function TableRow(props) {
    return (
        <tr key={props.id}>
            <td>{props.id}</td>
            <td>{props.name}</td> 
            <td>{props.age}</td>
            <td>{props.gender}</td>
            <td>{props.email}</td> 
            <td>{props.phoneNo}</td>
        </tr>
    )
}
