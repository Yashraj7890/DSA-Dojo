import HomeNav from "./HomeNav";
import ProblemTable from "./ProblemTable";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebase";
import { useState } from "react";

const Home = ({user}) => {
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });


  const handleChange = async (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProblem = {
      ...inputs,
      order: parseInt(inputs.order),
    };

    await setDoc(doc(firestore, "problems", inputs.id), newProblem);
  };

  return (
    <div>
      <HomeNav user={user}></HomeNav>
      <main className="bg-dark-layer-2 min-h-screen">
        <h1
          className="text-2xl text-center text-black font-medium
					uppercase mt-10 mb-5 py-5"
        >
          Problems <i className="fa-solid fa-code text-2xl pl-2"></i>
        </h1>

        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          <table className="text-sm text-left text-black sm:w-7/12 w-full max-w-[1200px] mx-auto">
            <thead className="text-md text-black  border-b uppercase font-bold  text-center ">
              <tr className="bg-gray-200 rounded-md shadow-sm ">
                <th scope="col" className="px-1 py-3 w-0 font-medium">
                  {user&&<span>Status</span>}
                  {!user&&<span>No.</span>}
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Solution
                </th>
              </tr>
            </thead>

            <ProblemTable setLoading={setLoading} user={user}></ProblemTable>
            
          </table>
          
          {loading && (
            <div className=" max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              <LoadingSkeleton></LoadingSkeleton>
              <LoadingSkeleton></LoadingSkeleton>
              <LoadingSkeleton></LoadingSkeleton>
              <LoadingSkeleton></LoadingSkeleton>
              <LoadingSkeleton></LoadingSkeleton>
              <LoadingSkeleton></LoadingSkeleton>
              <LoadingSkeleton></LoadingSkeleton>
            </div>
          )}
          {!loading&&(<div className="text-center mt-[1.5rem]">Stay tuned for more problems <i class="fa-regular fa-face-smile-wink ml-[0.5rem] text-lg"></i></div>)}
        </div>
        {/*<form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            placeholder="problem id"
            type="text"
            name="id"
          ></input>
          <input
            onChange={handleChange}
            placeholder="title"
            type="text"
            name="title"
          ></input>
          <input
            onChange={handleChange}
            placeholder="difficulty"
            type="text"
            name="difficulty"
          ></input>
          <input
            onChange={handleChange}
            placeholder="category"
            type="text"
            name="category"
          ></input>
          <input
            onChange={handleChange}
            placeholder="videoId"
            type="text"
            name="videoId"
          ></input>
          <input
            onChange={handleChange}
            placeholder="order"
            type="text"
            name="order"
          ></input>
          <button>save</button>
        </form>*/}
      </main>
    </div>
  );
};
const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-gray-300"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-gray-300"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-gray-300"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-gray-300"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Home;
