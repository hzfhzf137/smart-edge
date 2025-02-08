import React from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";

const SmartWatches = () => {
  return (
    <React.Fragment>
        <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Smart Watches</h1>
      {/* Add more details about Airpods as needed */}
    </div>
    <Footer/>
    </React.Fragment>
  );
};

export default SmartWatches;
