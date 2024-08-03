"use client";
import { config } from "@/utils/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Login = () => {
  interface FormData {
    username: string;
    password: string;
  }

  interface decodedToken {
    role: string;
  }

  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const [hide, setHide] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePasswordShowHide = () => {
    setHide(!hide);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.username == "" || data.password == "") return;
    try {
      const response = await fetch(`${config.server}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const token = responseData?.token;
        if (token) {
          const decodedToken = jwtDecode<decodedToken>(token);
          if (decodedToken?.role === "player") {
            alert("Login successfull!!");
            Cookies.set("token", token);
            router.push("/");
          } else {
            alert("Access denied!");
          }
        } else {
          alert("Inavlid Token!");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("An error occured! Please try again");
    }
  };

  return (
    <div className="bg-[#1a1a1d] !w-screen !h-screen flex items-center justify-center">
      <div className="relative bg-clip-padding backdrop-filter backdrop-blur-[5px] bg-opacity-10 flex z-[1] items-center justify-center w-[70%] h-[45vh] sm:h-[60vh] lg:w-[25%] sm:min-w-[400px] min-w-[300px] rounded-[1.8vw] p-5">
        <div className="w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="absolute top-auto left-0 z-[2] w-full h-[80%] m-auto p-5 flex flex-col items-center justify-evenly"
          >
            <h1 className="text-center tracking-wider uppercase font-semibold text-4xl bg-gradient-to-br from-[#d6a250] via-[#ffe500] to-[#e6b800] bg-clip-text text-transparent drop-shadow-xl">
              Betting Paradise
            </h1>
            <div className="w-[90%] space-y-10 mx-auto text-white">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-lg font-extralight tracking-wider"
                >
                  Username
                </label>
                <div className="flex items-center space-x-3 bg-[#554e4e54] rounded-md text-md">
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={data.username}
                    onChange={handleChange}
                    autoComplete="new-username"
                    className="outline-none w-full text-xl px-3 py-2 placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-[#a59f9fef]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-lg font-extralight tracking-wider"
                >
                  Password
                </label>
                <div className="flex items-center space-x-3 bg-[#554e4e54] rounded-md text-md">
                  <input
                    type={hide ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={data.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="outline-none w-full text-xl px-3 py-2 placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-[#a59f9fef]"
                  />
                  {data.password.length > 0 && (
                    <div className="p-2">
                      {!hide ? (
                        <svg
                          onClick={handlePasswordShowHide}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide cursor-pointer lucide-eye"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg
                          onClick={handlePasswordShowHide}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide cursor-pointer lucide-eye-off"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                          <line x1="2" x2="22" y1="2" y2="22" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-center border-2 border-[#ffe500] text-[#ffe500] mx-auto text-xl rounded-xl py-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-full"
                >
                  <span>LOGIN</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
