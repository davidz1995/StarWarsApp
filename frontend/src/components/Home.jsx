import React, {useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Navigate} from 'react-router-dom';
import axios from 'axios'

function Home() {

    const [films, setFilms] = useState([]);
    //let titles = films.map(e => e.properties.title)

    const GET_PLANETS = () => {
        axios.get(`http://localhost:4000/v1/film`)
        .then(res => {
        setFilms(res.data.result)
      })
    }

    useEffect(() => {
        GET_PLANETS()
      },[]);

    let authorized = localStorage.getItem('tokenStarwarsApp')
    return (
        <>
        {authorized?
            <div>
            <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">Starwars App</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link href="#action1">Favoritos</Nav.Link>

                    <NavDropdown title="Films" id="navbarScrollingDropdown">
                    {films && films.length?
                        films.map( (e, index)=> {return (
                            <NavDropdown.Item key={index} href="#action3" style={{marginBottom:'1em'}}>Title: {e.properties.title}</NavDropdown.Item>
                        )
                        })
                        :
                        null
                    }
                    </NavDropdown>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Buscar</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </div>
            :
            <Navigate to='/'/>
        }
    </>
    )
}

export default Home
