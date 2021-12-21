import React from 'react'
import {useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';

function ListCharactersByFilm() {
    const characters = useSelector(state => state.charactersByFilms)
    return (
        <div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Género</th>
                <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                {characters && characters.length?
                    characters.map((e, index)=> {return(
                        <tr key={index}>
                            <td>{e.result.uid}</td>
                            <td>{e.result.properties.name}</td>
                            <td>{e.result.properties.gender}</td>
                            <td>{e.result.description}</td>
                        </tr>
                    )})
                    :null
                } 
            </tbody>
            </Table>
        </div>
    )
}

export default ListCharactersByFilm
