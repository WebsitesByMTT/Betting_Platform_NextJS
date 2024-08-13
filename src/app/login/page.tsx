"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { DecodedToken, FormData } from "@/utils/types";
import { login } from "@/utils/actions";
import ShowEye from "@/components/svg/ShowEye";
import HideEye from "@/components/svg/HideEye";

const Login = () => {
  const [data, setData] = useState<FormData>({ username: "", password: "" });
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.username == "" || data.password == "")
      return alert("Both username and password are required!");

    const response = await login(data);
    console.log(response);
    if (response?.error) {
      return alert(response?.error || "Login failed");
    }
    const token = response?.token;
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
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
                        <ShowEye
                          onClick={() => {
                            setHide(!hide);
                          }}
                        />
                      ) : (
                        <HideEye
                          onClick={() => {
                            setHide(!hide);
                          }}
                        />
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
