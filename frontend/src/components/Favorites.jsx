import React, {useEffect, useState} from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

function Favorites() {

    const [favorites, setFavorites] = useState([])
    let authorized = localStorage.getItem('tokenStarwarsApp')

    const GET_FAVORITES = () => {
        axios.get(`http://localhost:4000/v1/favorite`,{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
        .then(res => {
            setFavorites(res.data)
      })
    }

    const handleClickDelete = (e) => {
        axios.delete(`http://localhost:4000/v1/favorite/${e.target.value}`,{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
        .then(() => {
            GET_FAVORITES()
      })
    }

    useEffect(() => {
        GET_FAVORITES()
      },[]);

    return (
        <>
        {authorized? 
            <div>
                <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/home">Starwars App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/favorites">Favoritos</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Planeta</th>
                            <th>Año de nacimiento</th>
                        </tr>
                    </thead>

                    <tbody>
                    {favorites.length?
                        favorites.map((e, index)=> { return (
                            <tr key={index}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.description}</td>
                                <td>{e.planet}</td>
                                <td>{e.birthYear}</td>
                                <td><Button variant="danger" value={e._id} onClick={handleClickDelete}>Delete</Button></td>
                            </tr>
                        )})
                        : 
                        null
                    }
                    </tbody>
                </Table>
            </div>
            :
            <Navigate to='/'/>
        }
        </>
    )
}

export default Favorites
