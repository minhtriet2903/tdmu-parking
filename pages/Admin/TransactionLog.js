import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table } from "antd";
import axios from "axios";
import BuyTicketModal from "../../src/components/BuyTicketModal";
import NapTienModal from "../../src/components/NapTienModal";

export default function TransactionLog({ data }) {
  const columns = [
    {
      title: "Method",
      dataIndex: "Method",
      key: "Method",
      width: 200,
    },
    {
      title: "Trans Date",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 400,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <button>Del</button>
        </Space>
      ),
      width: 400,
    },
  ];

  const [isBuyTicketModalOpen, setIsBuyTicketModalOpen] = useState(false);
  const [isVisibleNapTienModal, setIsVisibleNapTienModal] = useState(false);

  const showBuyTicketModal = () => {
    setIsBuyTicketModalOpen(true);
  };
  const handleBuyTicketCancel = () => {
    setIsBuyTicketModalOpen(false);
  };
  const showNapTienModal = () => {
    setIsVisibleNapTienModal(true);
  };
  const handleCancelNapTien = () => {
    setIsVisibleNapTienModal(false);
  };

  return (
    <div className="flex flex-col bg-[#F1F6FD] h-[500px] m-5 rounded-xl pt-5">
      <BuyTicketModal
        showModal={showBuyTicketModal}
        isModalOpen={isBuyTicketModalOpen}
        handleCancel={handleBuyTicketCancel}
      ></BuyTicketModal>
      <NapTienModal
        showModal={showNapTienModal}
        isModalOpen={isVisibleNapTienModal}
        handleCancel={handleCancelNapTien}
      ></NapTienModal>
      <div className="flex ml-16">
        <div
          className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
        cursor-pointer font-semibold m-2"
          onClick={showNapTienModal}
        >
          Nạp tiền
        </div>
        <div
          className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
        cursor-pointer font-semibold m-2"
          onClick={showBuyTicketModal}
        >
          Mua phiếu xe
        </div>
      </div>
      <div className="justify-center flex">
        <Table columns={columns} dataSource={data} size={"large"} />
      </div>
    </div>
  );
}
