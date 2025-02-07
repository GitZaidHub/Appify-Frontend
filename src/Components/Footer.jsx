import React from "react";
import { MdEmail } from "react-icons/md";
import { FaGithub,FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white  w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold">Appify</h2>
            <p className="mt-2 text-sm">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0 ">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=creationmz445@gmail.com"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl "
            >
              <MdEmail />
            </a>
            <a
              href="https://github.com/GitZaidHub"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl "
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/zaidmohd517/"
              target="_blank"
              className="text-gray-400 hover:text-white text-xl "
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
