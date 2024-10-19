import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // Importing icons
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const Contact = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg">
      {/* Added border and padding */}
      <div className="p-6 bg-gray-100 h-[30vh]">
        <p className="text-muted text-3xl font-bold">Contact Now</p>
        <h1 className="text-lg text-foreground">
          Through These Details, You Can Easily Reach Out to Me
        </h1>
      </div>

      <div className="flex flex-col mt-8 md:flex-row w-full mx-auto px-4 md:px-32 border border-gray-300">
        {/* Left Part: Office Address and Social Media */}
        <div className="w-full md:w-1/2 text-black p-4 flex flex-col">
          <h2 className="text-black text-xl font-semibold">Office Address</h2>
          <p className="mt-2">1234 Street Name, City, State, 12345</p>
          <h2 className="text-black text-xl font-semibold">Number</h2>
          <p className="mt-2">+91 1234567890</p>
          <h3 className="text-red-500 text-lg font-semibold mt-4">
            Follow Me:
          </h3>
          <div className="flex space-x-4 mt-2">
            {/* Using react-icons for social media with Link */}
            <Link
              to="#"
              className="bg-gray-200 shadow-lg p-2 rounded-full text-blue-700 hover:text-blue-600"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="bg-gray-200 shadow-lg p-2 rounded-full text-blue-700 hover:text-blue-600"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="bg-gray-200 shadow-lg p-2 rounded-full text-red-600 hover:text-red-600"
            >
              <FaInstagram />
            </Link>
            <Link
              to="#"
              className="bg-gray-200 shadow-lg p-2 rounded-full text-blue-700 hover:text-blue-600"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Right Part: Google Map */}
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-lg font-semibold mb-2">Our Location</h2>
          <div className="h-[40vh]">
            {/* Replace the src with the actual Google Map Embed URL */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509384!2d144.9537353153185!3d-37.81627997975121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11a4d7%3A0x5045675218ceed32!2sOffice!5e0!3m2!1sen!2sau!4v1614307890123!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              title="Google Map showing office location" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Us Form */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-2xl font-bold mt-2">Any questions?
        </h2>
        <h4 className="mb-6">Feel free to contact us!</h4>
        <form className="w-full md:w-1/2 flex flex-col items-center space-y-4">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Message Input */}
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
