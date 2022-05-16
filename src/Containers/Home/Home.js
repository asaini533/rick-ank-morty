import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./Home.css";
import HomeHeader from "./HomeHeader/HomeHeader";
import * as actionCreators from "../../Store/Actions/index";
import Character from "../../Components/Shared/Character/Character";
import ReactSpinner from "../../Components/Shared/ReactSpinner/ReactSpinner";
import Pagination from "../../Components/Shared/Pagination/Pagination";
import ErrorModal from "../../Components/Shared/ErrorModal/ErrorModal";

const Home = (props) => {
  const [page, setPage] = useState(1);

  const onChangePageNo = (event, page) => {
    setPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    props.onGetAllCharacters(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className="home__containers">
      <HomeHeader />

      {props.error ? (
        <ErrorModal />
      ) : (
        <div className="home__body">
          {props.loading || props.characters === null ? (
            <ReactSpinner />
          ) : (
            <div className="home__body-characters-container">
              {props.characters.results.map((char) => (
                <Character key={char.id} char={char} />
              ))}
            </div>
          )}
        </div>
      )}

      {props.characters !== null && (
        <Pagination
          onChange={onChangePageNo}
          totalPage={props.characters.info.pages}
          page={page}
        />
      )}

      <div className="footer">
        <p>Rick and Morty Footer</p>
      </div>
    </div>
  );
};

const mapStateFromProps = (state) => {
  return {
    loading: state.char.loading,
    error: state.char.error,
    characters: state.char.characters,
  };
};

const mapDispatchFromProps = (dispatch) => {
  return {
    onGetAllCharacters: (data) =>
      dispatch(actionCreators.getAllCharacters(data)),
  };
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Home);
