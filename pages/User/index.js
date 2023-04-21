import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, Input, Select, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../src/components/NavBar";
import axios from "axios";

const User = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const loginUser = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null;

    axios
      .get(
        process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/users/" + loginUser._id,
        {}
      )
      .then(function (response) {
        // console.log(response.data);
        setUserInfo(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col bg-white h-screen justify-between">
      <div className="items-start">
        <NavBar></NavBar>
        <div className="flex flex-col ml-[200px] pt-5">
          <div className="flex">
            <div>Email</div>
            <div className="font-bold ml-2">{userInfo?.Email}</div>
          </div>
          <div className="flex">
            <div>Cấp độ tài khoản</div>
            <div className="font-bold ml-2">{userInfo?.Role}</div>
          </div>
          <div className="flex">
            <div>Số tiền hiện tại trong tài khoản</div>
            <div className="font-bold ml-2">{userInfo?.CurrentAmount}</div>
          </div>
          <div className="flex">
            <div>Tổng số tiền đã nạp vào tài khoản</div>
            <div className="font-bold ml-2">{userInfo?.TotalAmount}</div>
          </div>
          <div className="font-bold text-[20px] mt-5">Lịch sử nạp tiền</div>
        </div>
      </div>
      <div className="flex w-full bg-sky-50 justify-center items-center p-5 mt-5 ">
        © 2022 Copyright: Nguyễn Phạm Minh Triết
      </div>
    </div>
  );
};
export default User;
