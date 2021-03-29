import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextFieldsIcon from "@material-ui/icons/TextFields";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    width: "80vw",
  },
}));

export default function TransitionsModal({ loadTemplate }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen} className="template__btn">
        <TextFieldsIcon /> <br />
        <span>Template</span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div id="templates" onClick={() => setOpen(!open)}>
              <div className="template" onClick={() => loadTemplate(1)}>
                <img
                  src="https://api.unlayer.com/v1/editor/11721/templates/28497/thumbnail?t=1613096809146"
                  alt="json"
                />
              </div>

              <div className="template" onClick={() => loadTemplate(2)}>
                <img
                  src="https://api.unlayer.com/v1/editor/11721/templates/28496/thumbnail?t=1613096676088"
                  alt="json"
                />
              </div>

              <div className="template" onClick={() => loadTemplate(3)}>
                <img
                  src="https://i.ibb.co/sgLJsFH/Screenshot-1.png"
                  alt="json"
                />
              </div>
              <div className="template" onClick={() => loadTemplate(4)}>
                <img
                  src="https://i.ibb.co/QpBZXty/Screenshot-2.png"
                  alt="json"
                />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
