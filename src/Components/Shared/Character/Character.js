import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

import "./Character.css";

import Chapter from "../Chapter/Chapter";

const Character = (props) => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="character__container">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="250"
          image={props.char.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            style={{ fontWeight: "500" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.char.name}
          </Typography>

          <div className="character__info">
            <div className="character__info-species">
              <span>Species : </span>
              {props.char.species}
            </div>
            <div className="character__info-gender">
              <span>Gender : </span>
              {props.char.gender}
            </div>
          </div>

          <div className="character__origin">
            <span>{props.char.name.split(" ")[0]} Origin:</span>
            <p className="character__origin-content">
              {props.char.origin.name}
            </p>
          </div>

          <div className="character__location">
            <span>Last known location:</span>
            <p className="character__location-content">
              {props.char.location.name}
            </p>

            {props.char.fullLocation && props.char.fullLocation.dimension && (
              <div className="character__location-dimension">
                <span>Dimensions:</span>
                <p className="character__location-content">
                  {props.char.fullLocation.dimension}
                </p>
              </div>
            )}

            {props.char.fullLocation && (
              <div className="character__location-container">
                {props.char.fullLocation.length !== 0 && (
                  <div>
                    <span>Amount of residents:</span>
                    <p className="character__location-content">
                      {props.char.fullLocation.residents.length}
                    </p>
                  </div>
                )}

                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </div>
            )}
          </div>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {props.char.chapters && (
              <div className="character__chapters">
                <div className="character__chapters">
                  <span>Chapters:</span>
                  <div className="character__chapters-container">
                    {props.char.chapters.map((chapter) => (
                      <Chapter key={chapter.id} chapter={chapter.name} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Collapse>
        </CardContent>
      </Card>
    </div>
  );
};

export default Character;
