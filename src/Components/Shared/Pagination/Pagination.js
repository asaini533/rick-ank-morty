import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./Pagination.css";

function page(props) {
  const onChangeHandler = (event, page) => {
    props.onChange(event, page);
  };
  return (
    <div className="page__conatiner">
      <Stack spacing={2}>
        <Pagination
          count={props.totalPage}
          onChange={onChangeHandler}
          page={props.page || 1}
        />
      </Stack>
    </div>
  );
}

export default page;
