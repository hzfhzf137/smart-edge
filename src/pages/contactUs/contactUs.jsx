// src/pages/contactUs/contactUs.jsx
import React, { useEffect } from "react";
import Navbar from "../reuseableComponents/navbar";
import Footer from "../reuseableComponents/footer";
import MapComponent from "./components/mapComponent";
import Address from "./components/address";
import ContactUsForm from "./components/contactUsForm";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <MapComponent />
      <div className="flex flex-col md:flex-row w-screen">
        <Address />
        <ContactUsForm />
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
