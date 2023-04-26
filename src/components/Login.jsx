import { useState } from "react";
import { Form, json, useNavigate } from "react-router-dom";
import { setCurrentUser, useLoginUserMutation } from "../store";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, loginUserResults] = useLoginUserMutation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };

    loginUser(userData)
      .unwrap()
      .then((res) => {
        console.log(res);

        const token = res.accessToken;
        const currentUserData = {
          accessToken: token,
          id: res.user.id,
          email: res.user.email,
          name: res.user.name,
        };

        dispatch(setCurrentUser(currentUserData));
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.error) {
          const confirm = window.confirm(
            "Failed To Connect!! Reload the Page?"
          );
          if (confirm) {
            window.location.reload();
          }
        }
        setErrMsg(e.data);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <img
            src="https://images5.alphacoders.com/349/349660.jpg"
            alt="ConcertImage"
            className="object-cover h-48 w-96"
          />
        </div>

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          {errMsg && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Login Failed!
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>Incorrect Email or Password!</p>
              </div>
            </div>
          )}
          <Form method="POST" onSubmit={handleFormSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button
                disabled={loginUserResults.isLoading}
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
