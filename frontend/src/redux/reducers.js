import { GET_CHARACTERS_BY_FILMS } from "./actions/actionTypes";

const initialState = {
    charactersByFilms: [],
  };

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHARACTERS_BY_FILMS :
      return {
        ...state,
        charactersByFilms:action.payload
      }
    default :
        return {
          ...state
        }
      }
  }

export default reducer 