import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-gray-200 py-6 px-6 md:px-9">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center text-center md:text-left">
        {/* Left Side - Copyright */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <span className="block text-sm text-gray-700">
            © 2025 by Fer202_FPT_University
          </span>
          <div className="flex justify-center md:justify-start items-center text-sm text-gray-700">
            <span>Powered and secured by</span>
            <a
              href="#"
              className="text-gray-800 font-medium ml-1 hover:underline"
            >
              Group 2
            </a>
          </div>
        </div>

        {/* Right Side - Contact and Social */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-6">
          {/* Call Section */}
          <div className="text-center">
            <div className="font-medium text-gray-800">Call</div>
            <div className="text-gray-700">123-456-7890</div>
          </div>

          {/* Write Section */}
          <div className="text-center">
            <div className="font-medium text-gray-800">Write</div>
            <div className="text-gray-700">info@mysite.com</div>
          </div>

          {/* Follow Section */}
          <div className="text-center">
            <div className="font-medium text-gray-800">Follow</div>
            <div className="flex justify-center space-x-3 mt-2">
              {["facebook", "twitter", "linkedin", "instagram"].map(
                (icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.44 1.44 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
