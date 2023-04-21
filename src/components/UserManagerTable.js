import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table, DatePicker, Select, message } from "antd";
import axios from "axios";
import AddUserModal from "./AddUserModal";
import NapTienModal from "./NapTienModal";
import RegisterModal from "./RegisterModal";

export default function UserManagerTable({ userData, setUserDetail }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisibleNapTienModal, setIsVisibleNapTienModal] = useState(false);
  const [isVisibleRegisterModal, setIsVisibleRegisterModal] = useState(false);
  const [idUserNapTien, setIdUserNapTien] = useState();

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Email đăng ký",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Số tiền đã nạp",
      dataIndex: "TotalAmount",
      key: "TotalAmount",
    },
    {
      title: "Số tiền hiện tại",
      dataIndex: "CurrentAmount",
      key: "CurrentAmount",
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <div
            className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300"
            onClick={(e) => {
              e.stopPropagation();
              setIdUserNapTien(item._id);
              showNapTienModal();
            }}
          >
            Nạp tiền
          </div>
          <div
            className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300"
            onClick={(e) => {
              e.stopPropagation();
              setIdUserNapTien(item._id);
              showModal();
            }}
          >
            Đăng ký thẻ xe
          </div>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showNapTienModal = () => {
    setIsVisibleNapTienModal(true);
  };
  const handleCancelNapTien = () => {
    setIsVisibleNapTienModal(false);
  };

  const showRegisterModal = () => {
    setIsVisibleRegisterModal(true);
  };
  const handleCancelRegister = () => {
    setIsVisibleRegisterModal(false);
  };
  return (
    <div
      className="flex bg-[#e6f4ff] h-[550px] m-5 rounded-xl items-start
         pt-3 flex-col"
    >
      {contextHolder}
      <AddUserModal
        showModal={showModal}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        idUserNapTien={idUserNapTien}
      ></AddUserModal>
      <RegisterModal
        showModal={showRegisterModal}
        isModalOpen={isVisibleRegisterModal}
        handleCancel={handleCancelRegister}
      ></RegisterModal>
      <NapTienModal
        showModal={showNapTienModal}
        isModalOpen={isVisibleNapTienModal}
        handleCancel={handleCancelNapTien}
        idUserNapTien={idUserNapTien}
      ></NapTienModal>
      <div
        className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300 ml-3"
        onClick={(e) => {
          showRegisterModal();
        }}
      >
        Đăng ký
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        size={"large"}
        className="p-3"
        scroll={{
          y: 350,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // console.log(record);
              setUserDetail(record);
            }, // click row
          };
        }}
      />
    </div>
  );
}
