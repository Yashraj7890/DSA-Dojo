import { auth } from "../../firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";

const Reset = () => {

  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset = async (e) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success("Password reset email sent");
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error("Error sending email " + error.message);
    }
  }, [error]);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  
  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <h3 className="text-xl font-medium  text-black">Reset Password</h3>
      <p className="text-sm text-black ">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll
        send you an e-mail allowing you to reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-700"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white text-black"
          placeholder="name@company.com"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className={`w-full text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-gray-200 hover:bg-gray-300`}
      >
        Reset Password
      </button>
    </form>
  );
};
export default Reset;
