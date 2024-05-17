import React from "react";
import { authModalState } from "../../atoms/ModalAtom";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {

  const setAuthModalState = useSetRecoilState(authModalState);
  const [input, setInputs] = useState({
    email: "",
    displayName: "",
    password: "",
  });

  const handleClick = (value) => {
    setAuthModalState((prev) => ({ ...prev, type: value }));
  };


  const handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const newUser = await createUserWithEmailAndPassword(
        input.email,
        input.password
      );
      if (!newUser) {
        toast.error("Error creating account");
        return;
      } else if (newUser) {
        const value = newUser.user;

        const userData = {
          uid: value.uid,
          email: newUser.user.email,
          displayName: input.displayName,
          likedProblems: [],
          disLikedProblems: [],
          solvedProblems: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        try {
          await setDoc(doc(firestore, "users", value.uid), userData);
          window.location.href = process.env.REACT_APP_APP_URL+"/home";
        } catch (err) {
          toast.error("Error creating account " + err);
        }
      }
    } catch (error) {
      toast.error("Error creating account " + error);
    }
  };


  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <h3 className="text-xl font-medium text-black">Sign Up</h3>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-black"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  text-black"
          placeholder="name@company.com"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-sm font-medium block mb-2 text-black"
        >
          Display Name
        </label>
        <input
          type="displayName"
          name="displayName"
          id="displayName"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  text-black"
          placeholder="John Doe"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-black"
        >
          Password
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
        className="w-full text-black focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gray-200 hover:bg-gray-300"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="text-sm font-medium text-gray-400">
        Already have an account?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline"
          onClick={() => handleClick("login")}
        >
          Log In
        </a>
      </div>
    </form>
  );
};
export default Signup;
