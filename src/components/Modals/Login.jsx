import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/ModalAtom";
import { auth } from "../../firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {

  const setAuthModalState = useSetRecoilState(authModalState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [inputs, setInputs] = useState({ email: "", password: "" });


  const handleClick = (value) => {
    setAuthModalState((prev) => ({ ...prev, type: value }));
  };
  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) {
        toast.error("Error logging in " + error.message);
        return;
      } else {
        toast.success("Logged in successfully");
        window.location.href = process.env.REACT_APP_APP_URL+"/home";
      }
    } catch (error) {
      toast.error("Error logging in " + error);
    }
  };

  
  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <h3 className="text-xl font-medium text-black">Log In</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-black"
        >
          Your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    text-black"
          placeholder="name@company.com"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-black"
        >
          Your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
          placeholder="*******"
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full text-black font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-gray-200 hover:bg-gray-300"
      >
        {loading ? "Logging In..." : "Login"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("forgot password")}
      >
        <a
          href="#"
          className="text-sm block text-brand-orange hover:underline w-full text-right"
        >
          Forgot Password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-400">
        Not Registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("register")}
        >
          Create account
        </a>
      </div>
    </form>
  );
};
export default Login;
