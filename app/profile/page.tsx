/* eslint-disable @next/next/no-img-element */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import avatar from "../../assets/b79144e03dc4996ce319ff59118caf65.jpg";
import Image from "next/image";
export default function Home() {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigation.push("/");
        return;
      }

      try {
        const response = await fetch(
          "https://user-auth-api-nestjs.onrender.com/users/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          dispatch(
            setUser({
              id: data.data.id,
              fullName: data.data.fullName,
              username: data.data.username,
              password: "",
            })
          );
        } else {
          console.error("Failed to fetch user details:", data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [token, dispatch, navigation]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute left-0 flex w-full h-full hidden md:flex">
        <div className="w-2/5 bg-[#E5D2BE]"></div>
        <div className="w-1/3 bg-white"></div>
      </div>

      <div className="relative flex justify-center items-center min-h-screen p-4">
        <div className="bg-white w-full max-w-4xl shadow-md flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-neutral-100 p-6 sm:p-8 flex flex-col items-center justify-center w-full md:w-2/5">
            <div className="rounded-full overflow-hidden w-32 h-32 sm:w-48 sm:h-48 border-8 border-gray-300 mb-4 sm:mb-6">
              <Image
                src={avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {user ? (
              <h1 className="text-3xl sm:text-4xl font-bold text-center mb-1">
                {user.fullName || "Maya"}
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-bold text-center mb-1">
                Maya
              </h1>
            )}

            <div className="w-16 h-0.5 bg-blue-500 mb-4 sm:mb-6"></div>

            <h2 className="text-md sm:text-lg tracking-widest uppercase text-gray-700 font-medium mb-6 sm:mb-8">
              Project Manager
            </h2>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {["facebook", "twitter", "linkedin", "instagram"].map(
                (platform, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-8 w-full md:w-3/5">
            <h1 className="text-5xl sm:text-8xl font-bold mb-4">Hello</h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8">
              Here&apos;s who I am & what I do
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
              <button className="bg-blue-600 border-2 border-blue-600 text-white px-6 py-2 rounded-2xl font-medium hover:bg-white hover:text-black">
                RESUME
              </button>
              <button className="border-2 border-gray-600 px-6 py-2 rounded-2xl font-medium hover:bg-blue-600 hover:text-white">
                PROJECTS
              </button>
            </div>

            <p className="text-gray-600 mb-4 sm:mb-6">
              I&apos;m a paragraph. Click here to add your own text and edit me.
              It&apos;s easy. Just click &quot;Edit Text&quot; or double click
              me to add your own content and make changes to the font.
            </p>

            <p className="text-gray-600">
              I&apos;m a great place for you to tell a story and let your users
              know a little more about you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
