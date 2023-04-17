import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Login = ({
  isModalOpen,
  showModal,
  handleCancel,
  setLoginData,
  showRegisterModal,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const clientId =
    "970715451237-9qd17nt9v25sfchrado553vvt7j9svgq.apps.googleusercontent.com";

  const onSuccess = (credentialResponse) => {
    var userData = jwt_decode(credentialResponse.credential);
    console.log(userData);
    const params = {
      email: userData.email,
    };
    axios
      .get("http://localhost:5035/users/email", { params })
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.length == 0) {
            showRegisterModal();
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    setLoginData(userData);
    localStorage.setItem("loginData", JSON.stringify(userData));
    handleCancel();
  };

  const handleFailure = (result) => {
    alert(result.error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Modal
        title="Đăng nhập"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="flex justify-center"
      >
        <div className="flex justify-center">
          <div>
            <div className="flex flex-col justify-around h-[80px]">
              <Input
                placeholder="Nhập tên đăng nhập"
                className="!rounded !w-[300px]"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <Input
                placeholder="Nhập mật khẩu"
                className="!rounded !w-[300px]"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex justify-center">
              <div className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300">
                Đăng nhập
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-[400px] items-center flex bg-red-400 h-[50px] rounded-md
        justify-center cursor-pointer"
        >
          <GoogleLogin onSuccess={onSuccess} onError={handleFailure} />
        </div>
      </Modal>
      {/* <div className="flex justify-center flex-col items-center"></div>
      <a
        class="block py-2 pr-4 pl-3 text-gray-700 rounded
                   hover:bg-gray-100 md:hover:bg-transparent md:border-0
                    md:hover:text-blue-700 md:p-0 dark:text-gray-400
                     md:dark:hover:text-white dark:hover:bg-gray-700
                      dark:hover:text-white md:dark:hover:bg-transparent font-bold"
        onClick={showModal}
      >
        Đăng nhập
      </a> */}
    </GoogleOAuthProvider>
  );
};
export default Login;
