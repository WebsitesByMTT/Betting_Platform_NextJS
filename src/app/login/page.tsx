"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { DecodedToken, FormData } from "@/utils/types";
import { GetCaptcha, login } from "@/utils/actions";
import ShowEye from "@/components/svg/ShowEye";
import HideEye from "@/components/svg/HideEye";
import toast from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState<FormData>({
    username: "",
    password: "",
    captcha: "",
    captchaToken: "",
  });

  const [captchaSrc, setCaptchaSrc] = useState("");
  const [hide, setHide] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const fetchCaptcha = async () => {
    const captcha = await GetCaptcha();
    if (captcha?.error) {
      return toast.error(captcha.error);
    }
    if (captcha?.responseData) {
      setCaptchaSrc(captcha.responseData?.captcha);
      setData((prevState) => ({
        ...prevState,
        captchaToken: captcha.responseData?.token,
      }));
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      data.username == "" ||
      data.password == "" ||
      data.captcha == "" ||
      data.captchaToken == ""
    )
      return toast.error("All fields are required!");

    const response = await login(data);
    if (response?.error) {
      fetchCaptcha();
      return toast.error(response?.error || "Login failed");
    }
    const token = response?.token;
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken?.role === "player") {
        toast.success("Login successfull!!");
        Cookies.set("token", token);
        router.push("/All/americanfootball_cfl");
      } else {
        alert("Access denied!");
      }
    } else {
      alert("Invalid Token!");
    }
  };

  return (
      <div className="bg-clip-padding bg-[#1a1a1d] h-screen  backdrop-filter backdrop-blur-[5px] bg-opacity-10 flex z-[1] items-center justify-center w-full  rounded-[1.8vw] p-5">
          <form
            onSubmit={handleSubmit}
            className="absolute md:w-[60%] lg:w-[50%] xl:w-[35%] top-[50%] left-[50%] z-[2] translate-x-[-50%] translate-y-[-50%] w-full h-[80%] m-auto p-2 flex flex-col items-center justify-evenly"
          >
            <h1 className="text-center tracking-wider uppercase font-semibold lg:text-4xl text-2xl bg-gradient-to-br from-[#d6a250] via-[#ffe500] to-[#e6b800] bg-clip-text text-transparent drop-shadow-xl">
              Betting Paradise
            </h1>
            <div className="w-[90%] space-y-7 mx-auto text-white">
              <div>
                <label
                  htmlFor="username"
                  className="text-sm lg:text-lg font-extralight tracking-wider"
                >
                  Username
                </label>
                <div className="flex items-center bg-[#554e4e54] rounded-md text-md">
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={data.username}
                    onChange={handleChange}
                    autoComplete="new-username"
                    className="outline-none w-full lg:text-xl px-3 py-2 lg:placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-[#a59f9fef]"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm lg:text-lg font-extralight tracking-wider"
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
                    className="outline-none w-full lg:text-xl px-3 py-2 lg:placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-[#a59f9fef]"
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
              <div>
                <label
                  htmlFor="captcha"
                  className="text-sm lg:text-lg font-extralight tracking-wider"
                >
                  Captcha
                </label>
                <div className="flex items-center justify-between bg-[#554e4e54] rounded-md text-md">
                  <input
                    name="captcha"
                    placeholder="Enter Captcha"
                    value={data.captcha}
                    onChange={handleChange}
                    autoComplete="new-password"
                    className="outline-none w-full lg:text-xl px-3 py-2 lg:placeholder:text-xl font-extralight bg-transparent placeholder:font-extralight placeholder:text-[#a59f9fef]"
                  />
                  {captchaSrc && (
                    <div
                      dangerouslySetInnerHTML={{ __html: captchaSrc }}
                      className="h-full border-[#dfdfdfbc]  bg-[#ffffffc5] rounded-md"
                    ></div>
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
  );
};

export default Login;
