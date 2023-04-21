import { List } from "antd";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHeadset,
  faMoneyBillTransfer,
  faCartShopping,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ setIndexMenu }) => {
  const data = [
    { icon: faHome, title: "Home", key: "home" },
    { icon: faMoneyBillTransfer, title: "Giao dịch", key: "transLog" },
    { icon: faUser, title: "Người dùng", key: "users" },
    { icon: faCartShopping, title: "Thẻ xe", key: "cards" },
    { icon: faHeadset, title: "Hỗ trợ", key: "helper" },
    { icon: faGear, title: "Cài đặt", key: "settings" },
  ];

  return (
    <List
      size="large"
      header={
        <div className="flex flex-col w-full cursor-pointer">
          <div className="w-full flex justify-center">
            {/* <img src="/logo.png" className="w-[100px] h-[50px]"></img> */}
          </div>
          <div className="font-bold flex justify-center h-[80px] items-center">
            SMART PARKING
          </div>
        </div>
      }
      // footer={
      //   <div className="flex justify-center mt-[50px]">
      //     Copy by TDMU IT CLUB
      //   </div>
      // }
      dataSource={data}
      renderItem={(item) => (
        <div
          className="flex justify-start hover:bg-[#ECF4FF] 
          hover:border-r-[3px] border-[#3380FF] 
        ml-[15px] my-[15px] items-center pl-[30px] h-[40px] cursor-pointer mt-3"
          onClick={() => setIndexMenu(item.key)}
        >
          <FontAwesomeIcon icon={item.icon} className="text-[#3380FF]" />
          <div className="ml-3 font-bold">{item.title}</div>
        </div>
      )}
      className="w-[300px]"
    />
  );
};

export default SideBar;
