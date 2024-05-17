import React from "react";
import { auth } from "../../../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";


const HomeNav = ({ problemPage,user }) => {

  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = async () => {
    await signOut();
    toast.info("Signed out successfully");
    window.location.href = process.env.REACT_APP_APP_URL;
  };
  const handleRedirect=()=>{
    window.location.href = process.env.REACT_APP_APP_URL;
  }


  return (
    <nav className="relative flex h-[60px] w-full shrink-0 items-center px-5 bg-gray-200 shadow-md mb-2">
      <div className={`flex w-full items-center justify-between `}>
        <div className="h-[22px] flex-1 justify-center cursor-pointer" onClick={handleRedirect}>
          <span className="font-extrabold text-lg">DSA </span> Dojo
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          theme="dark"
        />
        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center font-bold">
            <a href={`${process.env.REACT_APP_APP_URL}/home`} >Problems</a>
          </div>
        )}

        <div className="flex items-center space-x-4 flex-1 justify-end">
          <div>
            {user? (
              <button
                onClick={handleLogout}
                className="rounded-lg bg-white font-bold shadow-sm px-2 py-1 hover:text-red-600 "
              >
                Logout
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HomeNav;
