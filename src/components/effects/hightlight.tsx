import React from "react";

const Highlight = () => {
  return (
    <>
      <div className="absolute top-1/4  left-3/4 lg:w-20 h-20 bg-amber-700 rounded-full mix-blend-screen filter blur-2xl opacity-70"></div>
      <div className="absolute top-1/4  left-3/4 lg:w-72 h-72 bg-amber-300 rounded-full mix-blend-overlay filter blur-2xl opacity-70  animate-pulse ease-out duration-7000"></div>
      <div className="absolute bottom-2/4  left-2/3 lg:w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-2xl opacity-70  animate-pulse ease-in-out duration-7000 "></div>
      <div className="absolute bottom-10  left-2/3 lg:w-72 h-72 bg-amber-600 rounded-full mix-blend-multiply filter blur-2xl opacity-40  animate-pulse ease-out"></div>
      <div className="absolute bottom-10  left-5 lg:w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-2xl opacity-70  animate-pulse ease-in-out duration-7000 "></div>
      <div className="absolute bottom-10  left-5  lg:w-48 h-48 bg-amber-300 rounded-full mix-blend-overlay filter blur-2xl opacity-70 animate-pulse ease-out duration-8000"></div>
    </>
  );
};

export default Highlight;
