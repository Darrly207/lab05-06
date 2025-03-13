import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const navigate = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-200 py-5 w-full px-4 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Title Section */}
        <div className="flex items-center w-full md:w-auto justify-between">
          <div
            className="flex items-center"
            onClick={() => navigate.push("profile")}
          >
            <div className="h-4 w-4 bg-blue-600" />
            <h2 className="font-bold text-2xl shadow-md shadow-amber-100 cursor-pointer ml-2">
              {user?.fullName || "Maya"}
            </h2>
            <h4 className="text-gray-800 shadow-md cursor-pointer shadow-amber-100 ml-2 text-lg mt-1 font-light font-sans hidden sm:block">
              / PROJECT MANAGER
            </h4>
          </div>

          <button
            className="block md:hidden text-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 pb-2 md:pb-0`}
        >
          <h4 className="font-light font-sans cursor-pointer w-full md:w-auto text-center">
            EDIT PROFILE
          </h4>
          <h4
            className="font-light font-sans cursor-pointer w-full md:w-auto text-center"
            onClick={() => navigate.push("/studentManagement")}
          >
            STUDENT MANAGEMENT
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
