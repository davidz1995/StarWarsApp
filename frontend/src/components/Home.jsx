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
import axios from 'axios';
import { getCharactersByFilm } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import ListCharactersByFilm from './ListCharactersByFilm';
import CarouselComponent from './Carousel';
import '../App.css'

function Home() {

    const dispatch = useDispatch()

    const [films, setFilms] = useState([]);
    const [character, setCharacter] = useState('');
    const [foundCharacter, setFoundCharacter] = useState('');
    const [moviesByCharacter, setMoviesByCharacter] = useState([])
    const [show, setShow] = useState('carousel');
    const [showCharacterList, setShowCharacterList] = useState(false)

    const characters = useSelector(state => state.charactersByFilms)
    let authorized = localStorage.getItem('tokenStarwarsApp')

    const GET_PLANETS = () => {
        axios.get(`http://localhost:4000/v1/film`,{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
        .then(res => {
        setFilms(res.data)
      })
    }

    useEffect(() => {
        GET_PLANETS();
      },[]);

    const handleSearchCharacter = () => {
        setShow('loading')
        axios.get(`http://localhost:4000/v1/character?name=${character}`,{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
            .then(res => {
                setFoundCharacter(res.data)
                setShow('completado')
                setShowCharacterList(false)
            })
            .catch(res => {
                alert('Personaje no encontrado.')
                setShow('carousel')
            })
    }

    const handleClickFavorites = () => {
        axios.post(`http://localhost:4000/v1/favorite`, {id:foundCharacter.id, name:foundCharacter.name, planet: foundCharacter.planet ,description:foundCharacter.description, birthYear:foundCharacter.birthYear},{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
        .then(res => {
            alert(res.data)
        })
        .catch(error => {
            alert(error)
        })
    }

    const handleClickFilm = (e) => {
        e.preventDefault();
        dispatch(getCharactersByFilm(e.target.value, authorized));
        setShowCharacterList(!showCharacterList);
        setShow('');
    }

    const handleShowMovies = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4000/v1/film/characterByFilm/${e.target.value}`,{
            headers:{
                Authorization: 'Bearer ' + authorized
            }
        })
        .then(res => {
            setMoviesByCharacter(res.data)
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
                            <NavDropdown.Item key={index}><button style={{backgroundColor:'transparent', borderStyle:'hidden', width:'100%', padding:'1em', textAlign:'left'}} value={e.uid} onClick={handleClickFilm} >T??tulo: {e.properties.title}</button></NavDropdown.Item>
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

            {showCharacterList && !characters.length?
                <div className="lds-facebook" style={{marginTop:'10em'}}><div></div><div></div><div></div></div>
                :
                showCharacterList && characters.length?
                <ListCharactersByFilm/>
                :null
            }

            {show === 'carousel'&&
                <div style={{height:'90vh'}}>
                    <CarouselComponent/>
                </div>
            }

            {show === 'loading'&&
            <div style={{marginTop:'13em'}}>
            <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div>
            }

            {show === 'completado'&&
            <Container>
                <Row>
                    <Col style={{textAlign:'-webkit-center', marginTop:'3em', marginBottom:'3em'}}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src='https://i1.wp.com/codigoespagueti.com/wp-content/uploads/2021/01/star-wars-peliculas.jpg?resize=1280%2C720&quality=80&ssl=1' />
                        <Card.Body>
                            <Card.Title>{foundCharacter.name}</Card.Title>
                            <Card.Text>
                            {foundCharacter.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Planeta: {foundCharacter.planet}</ListGroupItem>
                            <ListGroupItem>A??o de nacimiento: {foundCharacter.birthYear}</ListGroupItem>
                            {
                                moviesByCharacter.length?
                                <>
                                <ListGroupItem style={{fontWeight:'bold'}}>Peliculas</ListGroupItem>
                                {moviesByCharacter.map((e, index) => {return(
                                    <ListGroupItem key={index}>{e}</ListGroupItem>
                                )})}
                                </>
                                :null
                            }
                        </ListGroup>
                        <Card.Body style={{display:'flex', flexDirection:'row', heigth:'1em'}}>
                            <Button variant="outline-primary" style={{marginRight:'1em', fontSize:'.9rem', padding:'.2em'}} value={foundCharacter.id} onClick={handleShowMovies}>Ver en que peliculas aparece</Button>
                            <Button variant="outline-primary" style={{fontSize:'.9rem', padding:'.2em'}} onClick={handleClickFavorites}>Agregar a favoritos</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
            }
            </div>
            :
            <Navigate to='/'/>
        }
    </>
    )
}

export default Home
