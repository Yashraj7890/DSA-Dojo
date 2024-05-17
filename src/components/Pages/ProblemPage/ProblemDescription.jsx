import PreferenceNav from "./PreferenceNav";

const ProblemDescription = ({ Problem, status }) => {
  return (
    
    <div className="  h-[96%] min-w-[320px] relative  pb-10">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-white text-black overflow-x-hidden oveerflow-y-hidden">
        <div className={"bg-gray-300 rounded-t-[5px] px-5 py-[10px] text-xs "}>
          <strong>Description</strong>
        </div>
        <PreferenceNav></PreferenceNav>
      </div>

      <div className="flex px-0 py-4 h-full overflow-y-auto bg-gray-300 text-black ">
        <div className="px-5 h-full">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg  font-medium">
                {Problem.title}
              </div>
            </div>
            <div className="flex items-center mt-3">
              <div
                className={`text-olive bg-olive inline-block rounded-[21px] bg-white px-2.5 py-1 text-xs font-medium capitalize `}
              >
                Easy
              </div>
              {status && (
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 ">
                  <i class="fa-regular fa-circle-check text-lime-600"></i>
                </div>
              )}
              {!status && (
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 ">
                  <i class="fa-regular fa-circle-xmark"></i>
                </div>
              )}
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-black text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: Problem.problemStatement }}
              ></div>
            </div>

            {/* Examples */}
            <div className="mt-5">
              {Problem.examples.map((ex, index) => (
                <div className="mb-2 bg-white rounded-md p-2" key={ex.id}>
                  <p className="font-medium text-black ">
                    Example {index + 1} :{" "}
                  </p>
                  <div className="example-card text-black">
                    <div className="">
                      <strong>Input: </strong> {ex.inputText}
                      <br />
                      <strong>Output:</strong> {ex.outputText} <br />
                      <strong>Explanation:</strong> {ex.explanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-5">
              <div className="text-black text-sm font-medium">Constraints:</div>
              <ul className="text-black ml-5 list-disc">
                <div
                  dangerouslySetInnerHTML={{ __html: Problem.constraints }}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;
