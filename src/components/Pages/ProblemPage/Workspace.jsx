import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import Editor from "./Editor";
import { firestore } from "../../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";

const Workspace = ({ problem, Id, user }) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const getUserData = async (problem) => {
      try {
        const userRef = doc(firestore, "users", user.uid);
        const value = await getDoc(userRef);
        if (value.exists()) {
          const data = value.data();
          if (data.solvedProblems.includes(problem.id)) {
            setStatus(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      getUserData(problem);
    }
  }, []);

  return (
    <Split className="split h-[90vh] max-[635px]:overflow-x-scroll  bg-gray-300 border-y-black border-2 rounded-sm overflow-y-hidden">
      <ProblemDescription
        className="min-w-[325px] h-[80%]"
        Problem={problem}
        status={status}
      />
      <Editor
        className="min-w-[325px] h-[80%]"
        Problem={problem}
        Id={Id}
        setStatus={setStatus}
        user={user}
      />
    </Split>
  );
};
export default Workspace;
