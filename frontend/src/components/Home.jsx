import React, {useEffect, useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Navigate} from 'react-router-dom';
import axios from 'axios'

function Home() {

    const [films, setFilms] = useState([]);
    const [character, setCharacter] = useState('');
    const [foundCharacter, setFoundCharacter] = useState('')

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

    const handleSearchCharacter = () => {
        axios.get(`http://localhost:4000/v1/character?name=${character}`)
            .then(res => {
                setFoundCharacter(res.data[0])
            })
            .catch(res => {
                alert('Personaje no encontrado.')
            })
    }

    const handleClickFavorites = () => {
        axios.post(`http://localhost:4000/v1/favorite`, {id:foundCharacter.uid, name:foundCharacter.name})
        .then(res => {
            alert(res.data)
        })
        .catch(error => {
            alert(error)
        })
    }

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

                    <NavDropdown title="Peliculas" id="navbarScrollingDropdown">
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
                    placeholder="Busca un personaje..."
                    onChange={(e) => setCharacter(e.target.value)}
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success" onClick={handleSearchCharacter}>Buscar</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>

            {typeof foundCharacter === 'object'?
            <Container>
                <Row>
                    <Col style={{textAlign:'-webkit-center', marginTop:'3em', marginBottom:'3em'}}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src='https://i1.wp.com/codigoespagueti.com/wp-content/uploads/2021/01/star-wars-peliculas.jpg?resize=1280%2C720&quality=80&ssl=1' />
                        <Card.Body>
                            <Card.Title>{foundCharacter.name}</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Cras justo odio</ListGroupItem>
                            <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                            <ListGroupItem>Vestibulum at eros</ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <Button onClick={handleClickFavorites}>Agregar a favoritos</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
                :null
            }
            </div>
            :
            <Navigate to='/'/>
        }
    </>
    )
}

export default Home
