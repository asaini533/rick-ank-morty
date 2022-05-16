import * as actionTypes from "./actionTypes";

// Get all characters /***************************************************************************************************/
const getAllCharactersStart = () => {
  return {
    type: actionTypes.GET_ALL_CHARACTERS_START,
  };
};

const getAllCharactersSuccess = (data) => {
  return {
    type: actionTypes.GET_ALL_CHARACTERS_SUCCESS,
    data: data,
  };
};

const getAllCharactersFail = (error) => {
  return {
    type: actionTypes.GET_ALL_CHARACTERS_FAIL,
    error: error,
  };
};

export const getAllCharacters = (pageno) => {
  return async (dispatch) => {
    dispatch(getAllCharactersStart());

    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?page=" + pageno,
        { method: "GET" }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData);
      }

      // Getting all episodes
      for (const character of responseData.results) {
        const episodesIds = character.episode.map(
          (episode) => +episode.split("/").at(-1)
        );
        let episodes = await dispatch(getCharacterEpisodes(episodesIds));

        let fullLocation = [];
        if (character.location.url) {
          fullLocation = await dispatch(
            getCharacterLocation(character.location.url)
          );
        }

        if (Array.isArray(episodes)) {
          character.chapters = episodes;
          character.fullLocation = fullLocation;
        } else {
          character.chapters = [episodes];
          character.fullLocation = fullLocation;
        }
      }

      dispatch(getAllCharactersSuccess(responseData));
    } catch (err) {
      dispatch(getAllCharactersFail(err.message));
    }
  };
};

// Get Character episodes /*************************************************************************************************/
export const getCharacterEpisodes = (data) => {
  return async (dispatch) => {
    // dispatch(getAllLocationsStart());

    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/episode/" + data,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData);
      }

      return responseData;
    } catch (err) {
      dispatch(getAllCharactersFail(err.message));
    }
  };
};

//Get character location /*****************************************************************************************/
export const getCharacterLocation = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(data, {
        method: "GET",
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData);
      }

      return responseData;
    } catch (err) {
      dispatch(getAllCharactersFail(err.message));
    }
  };
};
