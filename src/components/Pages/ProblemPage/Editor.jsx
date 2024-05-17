import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { firestore } from "../../../firebase/firebase";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";

const Editor = ({ Problem, Id, setStatus, user }) => {
  const [testcase, setTestCase] = useState(0);
  const [panel, setPanel] = useState("default");
  let [code, setCode] = useState(Problem.starterCode);
  
  const handleSubmit = async (value) => {
    
    if (value === "Submitting" && !user) {
      toast.error("Please sign in first !!");
    } else {
      try {
        setPanel(value);
        code = code.slice(code.indexOf(Problem.starterFunctionName));
        const cb = new Function(`return ${code}`)();
        const success = Problem.handlerFunction(cb);

        if (success) {
          if (value === "Submitting") {
            setPanel("Successfully submitted ! All testcases passed");
            const userRef = doc(firestore, "users", user.uid);
            await updateDoc(userRef, {
              solvedProblems: arrayUnion(Id),
            });
            setStatus(true);
            toast.success("Successfully submitted !");
          } else if (value === "Running Testcases") {
            setPanel("All testcases passed !");
            toast.success("All testcases passed !");
          }
        }
      } catch (err) {
        if (err.message.startsWith("AssertionError: expected")) {
          toast.info("One or more testcases failed");
          if (value === "Submitting") {
            setPanel("Submission failed, One or more testcases failed");
          } else if (value === "Running Testcases") {
            setPanel("One or more testcases failed");
          }
        } else {
          setPanel(err.message);
        }
      }
    }
  };

  const handleReset = () => {
    setPanel("default");
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${Id}`);
    if (user) {
      setCode(code ? JSON.parse(code) : Problem.starterCode);
    } else {
      setCode(Problem.starterCode);
    }
  }, []);

  const onChange = (value) => {
    setCode(value);
    localStorage.setItem(`code-${Id}`, JSON.stringify(value));
  };

  return (
    <div className="flex flex-col bg-gray-300 relative min-w-[325px] max-[648px]:border-l-[5px] border-black overflow-y-hidden">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
      <Split
        className="h-[calc(100vh-74px)]"
        direction="vertical"
        size={[60, 60]}
        minSize={60}
        gutterSize={10}
      >
        <div className="w-full h-full overflow-y-auto bg-[#252526] py-4">
          <ReactCodeMirror
            value={code}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
            onChange={onChange}
          />
        </div>

        <div className="w-full px-5 overflow-auto bg-gray-300 py-5">
          {panel === "default" && (
            <>
              <div>
                <EditorFooter
                  setPanel={setPanel}
                  handleSubmit={handleSubmit}
                ></EditorFooter>
              </div>
              <div className="flex h-10 items-center space-x-6">
                <div className="relative flex h-full w-full flex-col justify-center cursor-pointer">
                  <div className="text-sm font-medium w-full leading-5 text-black">
                    Testcases
                  </div>
                  <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black"></hr>
                </div>
              </div>

              <div className="flex">
                {Problem.examples.map((ex, index) => (
                  <div
                    className="mr-2 items start mt-2 text-black"
                    key={ex.id}
                    onClick={() => setTestCase(index)}
                  >
                    <div className="flex flex-wrap items-center gap-y-4">
                      <div
                        className={`font-medium items-center transition-all focus:outline-none inline-flex 
             relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
               testcase === index ? "bg-white" : "bg-gray-200"
             }`}
                      >
                        Case {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="font-semibold mb-5">
                <p className="text-sm font-medium mt-4 text-black">Input: </p>
                <div className="w-full cursor text rounded-lg border p-2 bg-white border-transparent text-black mt-2">
                  {Problem.examples[testcase].inputText}
                </div>
                <p className="text-sm font-medium mt-4 text-black">
                  Expected Output:{" "}
                </p>
                <div className="w-full cursor text rounded-lg border p-2 bg-white border-transparent text-black mt-2">
                  {Problem.examples[testcase].outputText}
                </div>
              </div>
            </>
          )}
          {(panel === "Submitting" || panel === "Running Testcases") && (
            <div className="">
              <div className="mt-[2rem] ml-[2rem] text-xl ">
                <div>
                  {">"} {panel}{" "}
                  <i class="fa-solid fa-spinner fa-spin ml-[0.7rem]"></i>
                </div>
              </div>
            </div>
          )}
          {!(
            panel === "Submitting" ||
            panel === "Running Testcases" ||
            panel === "default"
          ) && (
            <div className="">
              <div className="mt-[2rem] ml-[2rem] text-xl ">
                <div className="">
                  {">"} {panel}{" "}
                </div>
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className=" bg-gray-100 rounded-md px-2 py-[1px] hover:bg-white shadow-md ml-[2rem] mt-[2rem]"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </Split>
    </div>
  );
};
export default Editor;
