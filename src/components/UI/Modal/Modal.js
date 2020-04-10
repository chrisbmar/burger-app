import React from "react";

import classes from "./Modal.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

const modal = ({ show, modalClosed, children }) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  // nextProps.show !== show ||
  // nextProps.children !== children
  //   );
  // }

  return (
    <Aux>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </div>
    </Aux>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
);
