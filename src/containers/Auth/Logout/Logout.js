import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { useDispatch } from "react-redux";

const logout = () => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(actions.logout());

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

export default logout;
