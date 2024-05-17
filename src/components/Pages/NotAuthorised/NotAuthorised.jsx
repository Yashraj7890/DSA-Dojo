const NotAuthorised = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center text-center">
      <div className="w-56 mx-auto text-xl">
        Not authorised <i class="fa-solid fa-lock text-2xl pl-2"></i>
      </div>
      <div className="pt-2">
        <a href="http://localhost:3000">Sign In</a>
      </div>
    </div>
  );
};
export default NotAuthorised;
