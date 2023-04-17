import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table, DatePicker, Select, message } from "antd";
import axios from "axios";
import AddUserModal from "./AddUserModal";
import NapTienModal from "./NapTienModal";

export default function Settings({ userData, setUserDetail }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisibleNapTienModal, setIsVisibleNapTienModal] = useState(false);
  const [idUserNapTien, setIdUserNapTien] = useState(false);

  const columns = [
    {
      title: "Người dùng hiện tại",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
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
            Mua thẻ xe
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
      <NapTienModal
        showModal={showNapTienModal}
        isModalOpen={isVisibleNapTienModal}
        handleCancel={handleCancelNapTien}
        idUserNapTien={idUserNapTien}
      ></NapTienModal>
      <Table
        columns={columns}
        dataSource={userData}
        size={"large"}
        className="p-3"
        scroll={{
          y: 290,
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
