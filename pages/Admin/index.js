import SideBar from "../../src/components/SideBar";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table } from "antd";
import axios from "axios";
import TransactionLog from "./TransactionLog";
import LoginModal from "../../src/components/LoginModal";
import AdminHome from "./AdminHome";
import UserManagerTable from "../../src/components/UserManagerTable";
import CardManager from "../../src/components/CardManager";
import Settings from "../../src/components/Settings";

const { Search } = Input;

export default function Admin() {
  const [indexMenu, setIndexMenu] = useState("transLog");
  const [transactionData, setTransactionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginData, setLoginData] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSearch = (value) => console.log(value);

  const handleSignOut = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  useEffect(() => {
    const isUserLogin = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null;
    if (isUserLogin) {
      setLoginData(isUserLogin);
    }

    if (indexMenu == "users") {
      axios
        .get("http://localhost:5035/users", {})
        .then(function (response) {
          console.log(response);
          setUserData(response.data.User);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else if (indexMenu == "transLog") {
      axios
        .get("http://localhost:5035/transaction", {})
        .then(function (response) {
          console.log(response);
          setTransactionData(response.data.Transaction);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (indexMenu == "users") {
      axios
        .get("http://localhost:5035/users", {})
        .then(function (response) {
          console.log(response);
          setUserData(response.data.User);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else if (indexMenu == "transLog") {
      axios
        .get("http://localhost:5035/transaction", {})
        .then(function (response) {
          console.log(response);
          setTransactionData(response.data.Transaction);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [indexMenu]);

  return (
    <div className="flex h-full">
      <LoginModal
        showModal={showModal}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setLoginData={setLoginData}
      ></LoginModal>
      <SideBar setIndexMenu={setIndexMenu} />
      <div className="flex flex-col w-full h-full">
        <div className="h-[80px] flex justify-between">
          <div className="flex items-center ml-10">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-[#3380FF]"
            />
          </div>
          <div className="flex w-1/3 justify-center">
            {loginData ? (
              <div className="flex">
                <div className="">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-[20px] h-[20px] mx-2"
                  />
                </div>
                <div>
                  <a href="/User" className="text-black">
                    {loginData.name}
                  </a>
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
                  className="text-[#3380FF] mr-10 cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-[#3380FF] cursor-pointer"
                />
                <div
                  className="text-[#3380FF] mx-10 cursor-pointer font-semibold"
                  onClick={showModal}
                >
                  Đăng nhập
                </div>
              </div>
            )}
          </div>
        </div>
        {indexMenu == "transLog" && <TransactionLog></TransactionLog>}
        {indexMenu == "home" && <AdminHome></AdminHome>}
        {indexMenu == "cards" && <CardManager></CardManager>}
        {indexMenu == "settings" && <Settings></Settings>}
        {indexMenu == "users" && (
          <UserManagerTable
            userData={userData}
            setUserDetail={setUserDetail}
          ></UserManagerTable>
        )}
      </div>
    </div>
  );
}