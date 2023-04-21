import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table, DatePicker, Select, message } from "antd";
import axios from "axios";
import BuyTicketModal from "./BuyTicketModal";
import AddCardModal from "./AddCardModal";

export default function CardManager({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBuyTicketModalOpen, setIsBuyTicketModalOpen] = useState(false);
  const [cardId, setCardId] = useState();

  const showBuyTicketModal = () => {
    setIsBuyTicketModalOpen(true);
  };
  const handleBuyTicketCancel = () => {
    setIsBuyTicketModalOpen(false);
  };

  const columns = [
    {
      title: "Mã thẻ cứng",
      dataIndex: "HardCardId",
      key: "HardCardId",
    },
    {
      title: "Người dùng hiện tại",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Phiếu xe đơn",
      dataIndex: "BikeTicket",
      key: "BikeTicket",
    },
    {
      title: "Phiếu xe theo gói",
      dataIndex: "PhieuXeTheoGoi",
      key: "PhieuXeTheoGoi",
    },
    {
      title: "Trạng thái",
      dataIndex: "IsActive",
      key: "IsActive",
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
              setCardId(item);
              showBuyTicketModal();
            }}
          >
            Mua phiếu xe
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

  return (
    <div
      className="flex bg-[#e6f4ff] h-[550px] m-5 rounded-xl items-start
         pt-3 flex-col"
    >
      <div
        className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300 ml-3"
        onClick={(e) => {
          showModal();
        }}
      >
        Thêm thẻ
      </div>
      <AddCardModal
        showModal={showModal}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      ></AddCardModal>
      <BuyTicketModal
        showModal={showBuyTicketModal}
        isModalOpen={isBuyTicketModalOpen}
        handleCancel={handleBuyTicketCancel}
        inputCardId={cardId}
      ></BuyTicketModal>
      <Table
        columns={columns}
        dataSource={data}
        size={"large"}
        className="p-3"
        scroll={{
          y: 290,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // console.log(record);
            }, // click row
          };
        }}
      />
    </div>
  );
}
