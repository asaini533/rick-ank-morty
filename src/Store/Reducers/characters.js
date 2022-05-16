import { updatedObject } from "../Utility";
import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  characters: null,
};

// Get all characters /***************************************************************************************************/
const getAllCharactersStart = (state, action) => {
  return updatedObject(state, { loading: true, error: null, characters: null });
};

const getAllCharactersSuccess = (state, action) => {
  return updatedObject(state, { loading: false, characters: action.data });
};

const getAllCharactersFail = (state, action) => {
  return updatedObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CHARACTERS_START:
      return getAllCharactersStart(state, action);
    case actionTypes.GET_ALL_CHARACTERS_SUCCESS:
      return getAllCharactersSuccess(state, action);
    case actionTypes.GET_ALL_CHARACTERS_FAIL:
      return getAllCharactersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
