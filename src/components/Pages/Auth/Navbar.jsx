import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/ModalAtom";
import { auth } from "../../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useSignOut } from "react-firebase-hooks/auth";

function Navbar({user}) {

  const setAuthModalState = useSetRecoilState(authModalState);
  const [signOut, loading, error] = useSignOut(auth);

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };
  const handleRedirect = () => {
    window.location.href = process.env.REACT_APP_APP_URL+"/home";
  };
  const handleLogout = async () => {
    await signOut();
    toast.info("Signed out successfully");
    window.location.href = process.env.REACT_APP_APP_URL;
  };

  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px 24 bg-gray-200 rounded-md shadow-sm">
      <div className="flex items-center justify-center h-20" >
        <span className="font-extrabold text-lg p-1">DSA </span> Dojo
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <div className="flex items-center">
        {user? (
          <>
            <button
              className="rounded-lg bg-white font-bold shadow-sm px-2 py-1 mr-3 hover:text-lime-600 "
              onClick={handleRedirect}
            >
              Continue
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-white font-bold shadow-sm px-2 py-1 hover:text-red-600 "
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="rounded-lg bg-white font-bold shadow-sm px-2 py-1 hover:text-sky-600 "
            onClick={handleClick}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
