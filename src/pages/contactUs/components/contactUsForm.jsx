// src/pages/contactUs/components/ContactUsForm.jsx
import React, { useState } from "react";

const ContactUsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/xdkdogpk", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setSubmitMessage("Thank you for your message!");
        e.target.reset();
        setTimeout(() => setSubmitMessage(""), 5000);
      } else {
        setSubmitMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-950 text-white w-full md:w-1/2 p-8">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h1 className="text-xl font-bold mb-4 text-center">Send Us a Message</h1>

        <label htmlFor="name" className="font-semibold">Name</label>
        <input
          id="name"
          name="name"
          required
          placeholder="Your Name"
          className="p-3 rounded bg-[#11182f] text-white border border-gray-600 focus:ring-blue-600 focus:outline-none"
        />

        <label htmlFor="email" className="font-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Your Email"
          className="p-3 rounded bg-[#11182f] text-white border border-gray-600 focus:ring-blue-600 focus:outline-none"
        />

        <label htmlFor="message" className="font-semibold">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          placeholder="Your Message"
          className="p-3 rounded bg-[#11182f] text-white border border-gray-600 focus:ring-blue-600 focus:outline-none"
        ></textarea>

        <button
          type="submit"
          className="mt-4 bg-gray-500 hover:bg-blue-600 transition px-6 py-2 rounded font-medium"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Send"}
        </button>
      </form>
      {submitMessage && (
        <div className="mt-4 text-center text-sm text-blue-600">{submitMessage}</div>
      )}
    </div>
  );
};

export default ContactUsForm;
