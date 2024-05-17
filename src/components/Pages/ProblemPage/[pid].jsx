import React from "react";
import HomeNav from "../Home/HomeNav";
import Workspace from "./Workspace";
import { Problems } from "../../problems/index";
import { useParams } from "react-router-dom";
const ProblemPage = ({user}) => {
  const { problemId } = useParams();
  return (
    <div>
      <HomeNav
        problemPage={true}
        problems={Problems}
        problemId={problemId}
        user={user}
      ></HomeNav>
      <Workspace
        problem={Problems[`${problemId}`]}
        Id={problemId}
        user={user}
      ></Workspace>
    </div>
  );
};
export default ProblemPage;
