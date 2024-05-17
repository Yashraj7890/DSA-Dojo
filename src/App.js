import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from "./components/Pages/Auth/Auth";
import Home from "./components/Pages/Home/Home";
import Loading from "./components/Pages/Loading/Loading";
import ProblemPage from "./components/Pages/ProblemPage/[pid]";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import NotAuthorised from "./components/Pages/NotAuthorised/NotAuthorised";

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading></Loading>;
  }else{
    if(!user){
      console.log(user)
    }
    
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Auth user={user}/>} />
          <Route
            exact
            path="/home"
            element={<Home user={user}/>}
          />
          <Route
            exact
            path="/problems/:problemId"
            element={<ProblemPage user={user}/>}
          />
        </Routes>
      </Router>
    );
  }
  
}

export default App;
