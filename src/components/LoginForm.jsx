import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
} from "../features/usersSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { currentUser } = useSelector((state) => state.users);
  const initialState = { fullname: "", email: "", id: nanoid() };
  const [loginState, setLoginState] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeFunc = (e) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const loginFunc = (e) => {
    e.preventDefault();
    dispatch(fetchStart());
    if (!currentUser?.id) {
      try {
        dispatch(loginSuccess(loginState));
        navigate("/home");
      } catch (error) {
        dispatch(fetchFail());
      }
    } else {
      try {
        dispatch(logoutSuccess());
      } catch (error) {
        dispatch(fetchFail());
      }
    }
    setLoginState(initialState);
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "94vh",
        width: "100vw",
      }}
    >
      <form
        className=" p-5 bg-light"
        style={{
          borderTopLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
        onSubmit={loginFunc}
      >
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            required
            name="fullname"
            value={loginState?.fullname || ""}
            onChange={(e) => changeFunc(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            name="email"
            value={loginState?.email || ""}
            onChange={(e) => changeFunc(e)}
          />
        </div>
        <div className="text-center">
          {!currentUser?.id ? (
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
