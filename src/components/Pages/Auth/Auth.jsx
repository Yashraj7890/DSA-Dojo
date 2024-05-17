import React from "react";
import Navbar from "./Navbar";
import Modal from "../../Modals/Modal";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/ModalAtom";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

const Auth = ({user}) => {

  const authModal = useRecoilValue(authModalState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const [addClass, setAddClass] = useState(false);

  const handleClick = (value) => {
    setAuthModalState((prev) => ({ ...prev, type: value, isOpen: true }));
  };
  const handleRedirect = () => {
    window.location.href = process.env.REACT_APP_APP_URL+"/home";
  };
  

  useEffect(() => {
    const addClassTimeout = setTimeout(() => {
      setAddClass(true);
    }, 1000);

    const removeClassTimeout = setTimeout(() => {
      setAddClass(false);
    }, 4000);

    return () => {
      clearTimeout(addClassTimeout);
      clearTimeout(removeClassTimeout);
    };
  }, []);

  return (
    <div className="bg-[#ffffff] h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Navbar user={user}></Navbar>
      </div>
      {authModal.isOpen && <Modal />}
      <div className="flex max-w-7xl mx-auto h-4/5 flex-col justify-center text-center">
        <div className="max-w-7xl mx-auto px-5 text-2xl">
          Welcome to <span className="font-extrabold text-xl p-1">DSA </span>{" "}
          Dojo
          <div className="my-3 text-3xl">
            <i
              className={
                addClass ? "fa-solid fa-code fa-bounce" : "fa-solid fa-code"
              }
            ></i>
          </div>
          A platform to practice data structures and algorithms for your coding
          interviews .
        </div>
        {user ? (
          <div>
            <button
              onClick={() => handleRedirect()}
              className="mt-4 text-lime-600 underline"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <button
              onClick={() => handleClick("login")}
              className="mr-2 text-sky-700 underline"
            >
              Log In
            </button>{" "}
            <button
              onClick={() => handleClick("register")}
              className="ml-2 text-sky-700 underline"
            >
              Sign Up
            </button>
            <div>
              <button
                onClick={() => handleRedirect()}
                className="mt-4 text-lime-600 underline"
              >
                Continue without Signing in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Auth;
