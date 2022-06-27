import React from "react";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import Search from "./Search";

const Header = ({ showTitle, handleSelection }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  let url = "";

  const handleClickOpen = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <header className="app-header">
      <div className="title">
        {showTitle ? (
          <a href="http://simplescore.info">
            <h1 className="item">🏡 Simple Score</h1>
          </a>
        ) : (
          <div></div>
        )}
      </div>
      <div className="links">
        <div className="link">
          <a
            href={url}
            onClick={(e) => handleClickOpen(e)}
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
          <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Simple Score"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Typography gutterBottom>
                  A very subjective approach to assign a{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Simple_living"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Simple Living
                  </a>{" "}
                  score to a residential address.
                </Typography>
                <Typography gutterBottom>
                  Once data is retrieved for a certain address, there is an
                  internal calculation to give the address a "Simple Score".
                  This is based on the walk score, bike score, proximity to
                  cafes, proximity to a public library, etc. It is an attempt to
                  provide an overall view on a location, and can be used when
                  purchasing a home for example.
                </Typography>
                <Typography gutterBottom>
                  Styled with Material UI. Using the WalkScore API, Google Maps
                  API, React, and axios to pull data.
                </Typography>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div className="link">
          <a
            href="https://github.com/dponzio/simple_score"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
