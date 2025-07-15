// src/pages/contactUs/components/Address.jsx
import React from "react";

const Address = () => {
  return (
    <div className="bg-gray-600 text-white w-full md:w-1/2 p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Smart Edge</h2>
      <p className="mb-4 leading-relaxed">
        UMT, Johar Town, <br />
        Lahore - 54000, Punjab, Pakistan.
      </p>
      <p className="mb-2">
        <span className="font-semibold">Email:</span>{" "}
        <a href="mailto:hzfhzf137@gmail.com" className="underline hover:text-gray-200">
          hzfhzf137@gmail.com
        </a>
      </p>
      <p className="mb-2">
        <span className="font-semibold">Phone:</span>{" "}
        <a href="tel:+923014278823" className="underline hover:text-gray-200">
          03014278823
        </a>
      </p>
      <p>
        <span className="font-semibold">Landline:</span>{" "}
        <a href="tel:+923250678823" className="underline hover:text-gray-200">
          03250678823
        </a>
      </p>
    </div>
  );
};

export default Address;
