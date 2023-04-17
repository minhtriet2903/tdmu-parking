import {
  faSignOut,
  faUser,
  faCheckCircle,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import LoginModal from "./LoginModal";
import axios from "axios";
import { Modal, message, Button, Space } from "antd";
import RegisterModal from "./RegisterModal";

const Nav = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [LogOut, setLogOut] = useState(false);

  const navBarItem = [
    { title: "Giao dịch", url: "Trans" },
    { title: "Quản lý thẻ", url: "Ticket" },
    { title: "Hỗ trỡ", url: "Help" },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showRegisterModal = () => {
    setIsOpenRegister(true);
  };
  const handleCancelRegister = () => {
    setIsOpenRegister(false);
  };

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const isUserLogin = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null;
    if (isUserLogin) {
      setLoginData(isUserLogin);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const LogOutCancel = () => {
    setLogOut(false);
  };
  const SignOut = () => {
    localStorage.removeItem("idAdmin");
    setIdAdmin(null);
    messageApi.open({
      type: "success",
      content: "Đã đăng xuất",
    });
    setLogOut(false);
  };

  return (
    <div className="mb-[100px]">
      {contextHolder}
      <Modal
        open={LogOut}
        onCancel={LogOutCancel}
        footer={null}
        closeIcon
        className="flex justify-center w-full"
      >
        <div className="text-lg font-medium text-center mb-5">Đăng xuất ?</div>
        <Space size="large">
          <Button onClick={SignOut} type="primary" danger>
            Đồng ý
          </Button>
          <Button onClick={LogOutCancel}>Hủy</Button>
        </Space>
      </Modal>

      <div className="mb-5">
        <div
          className="bg-white border-gray-200 first-letter:sm:px-4 py-2.5 rounded
         dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 opacity-90 flex w-screen
         items-center pt-5 justify-around px-10 border-b pb-5"
        >
          <div className="flex justify-start items-center">
            <div
              className="flex items-center"
              onClick={() => {
                router.push("/");
              }}
            >
              <div className="border-2 p-3 rounded-2xl">
                Student Smart Parking
              </div>
            </div>
            <div className="flex justify-start items-center ml-10">
              {navBarItem.map((item, index) => {
                if (router.pathname.split("/")[1] == item.url) {
                  return (
                    <div
                      className="border-gray-100 flex text-[18px] font-semibold "
                      onClick={() => {
                        if (!loginData) {
                          showModal();
                        } else {
                          router.push("/" + item.url);
                        }
                      }}
                    >
                      <div
                        className="block text-blue-700 rounded md:bg-transparent
                    md:p-0 dark:text-white mx-5 cursor-pointer"
                      >
                        {item.title}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="border-gray-100 flex text-[16px] hover:font-semibold mx-2"
                      onClick={() => {
                        if (!loginData) {
                          showModal();
                        } else {
                          router.push("/" + item.url);
                        }
                      }}
                    >
                      <div
                        className="block rounded md:bg-transparent mx-5
                    md:p-0 dark:text-white text-gray-700 cursor-pointer"
                      >
                        {item.title}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex justify-end">
              <LoginModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                setLoginData={setLoginData}
                showRegisterModal={showRegisterModal}
              />
              <RegisterModal
                showModal={showRegisterModal}
                handleCancel={handleCancelRegister}
                isModalOpen={isOpenRegister}
              ></RegisterModal>
              <div className="flex justify-center">
                {loginData ? (
                  <div className="flex">
                    <div className="mx-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="w-[20px] h-[20px] mx-2"
                      />
                    </div>
                    <div
                      onClick={() => {
                        router.push("/User");
                      }}
                      className="text-black w-auto"
                    >
                      {loginData.name}
                    </div>
                    <div onClick={handleSignOut} className="cursor-pointer">
                      <FontAwesomeIcon
                        icon={faSignOut}
                        className="w-[20px] h-[20px] mx-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center mr-10">
                    <FontAwesomeIcon
                      icon={faBell}
                      className="text-[#3380FF] cursor-pointer"
                    />
                    <div
                      className="text-[#3380FF] mx-10 cursor-pointer font-semibold w-[100px]"
                      onClick={showModal}
                    >
                      Đăng nhập
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Nav;
