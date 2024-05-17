import { React, useEffect } from "react";
import { AiFillYoutube } from "react-icons/ai";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { firestore, auth } from "../../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProblemTable = ({ setLoading, user }) => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  const problems = useGetProblems(setLoading);
  const solvedProblems = useGetSolvedProblems();

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  return (
    <>
      <tbody>
        {problems.map((doc, idx) => {
          return (
            <tr className="text-center" key={doc.id}>
              <th
                classname={
                  "px-2 py-4 font-medium whitespace-nowrap text-lime-600 "
                }
              >
                {user && solvedProblems.includes(doc.id) && (
                  <i class="fa-regular fa-circle-check text-lime-600"></i>
                )}
                {user && !solvedProblems.includes(doc.id) && (
                  <i class="fa-regular fa-circle-xmark"></i>
                )}
                {!user && <i>{idx + 1}</i>}
              </th>
              <td className="px-6 py-4">
                <a href={`/problems/${doc.id}`}>{doc.title}</a>
              </td>
              <td
                className={
                  doc.difficulty === "Easy"
                    ? "px-6 py-4 text-lime-600"
                    : doc.difficulty === "Medium"
                    ? "px-6 py-4 text-yellow-500"
                    : "px-6 py-4 text-red-500"
                }
              >
                {doc.difficulty}
              </td>
              <td className="px-6 py-4">{doc.category}</td>
              <td className="px-6 py-4">
                {doc.videoId ? (
                  <AiFillYoutube
                    fontSize={"28"}
                    className="cursor-pointer text-red-600 m-auto"
                    onClick={() =>
                      setYoutubePlayer({ isOpen: true, videoId: doc.videoId })
                    }
                  />
                ) : (
                  <p>Coming Soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>

      <tfoot>
        {youtubePlayer.isOpen && (
          <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
            <div
              className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
              onClick={closeModal}
            ></div>

            <div className="w-full z-50 h-full px-6 relative max-w-4xl">
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="w-full relative">
                  <IoClose
                    fontSize={"35"}
                    className="cursor-pointer absolute -top-16 right-0"
                    onClick={closeModal}
                    color="white"
                  />
                  <YouTube
                    videoId={youtubePlayer.videoId}
                    loading="lazy"
                    iframeClassName="w-full min-h-[500px]"
                  />
                </div>
              </div>
            </div>
          </tfoot>
        )}
      </tfoot>
    </>
  );
};
export default ProblemTable;

function useGetProblems(setLoading) {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const getProblems = async () => {
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const value = await getDocs(q);
      const tmp = [];

      value.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() });
      });

      setProblems(tmp);
      setLoading(false);
    };
    getProblems();
  }, [setLoading]);
  return problems;
}
function useGetSolvedProblems() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
    };

    if (user) getSolvedProblems();
    if (!user) setSolvedProblems([]);
  }, [user]);

  return solvedProblems;
}
