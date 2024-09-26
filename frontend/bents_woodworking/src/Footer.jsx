import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bent's Woodworking Assistant. All rights reserved.
          </p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/terms" className="text-sm hover:text-gray-300 transition duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-gray-300 transition duration-300">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
