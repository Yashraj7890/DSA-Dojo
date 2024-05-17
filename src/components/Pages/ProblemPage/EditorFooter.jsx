

const EditorFooter = ({ setPanel,handleSubmit }) => {
  const handleClick1 = () => {
    handleSubmit("Running Testcases");
  };
  const handleClick2 = async() => {
    handleSubmit("Submitting");
  };
  return (
    <div className="flex z-10  mt-2 rounded-lg bg-gray-400  ">
      <div className="mx-5 my-[10px] flex justify-between ">
        <div className="ml-auto flex items-center space-x-4">
          <button
            onClick={handleClick1}
            className="shadow-md px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-gray-200 hover:bg-white  rounded-lg"
          >
            Run Testcases
          </button>
          <button
            onClick={handleClick2}
            className="shadow-md px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-black bg-gray-200 hover:bg-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditorFooter;
