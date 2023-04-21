import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, Input, Select, DatePicker, Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../src/components/NavBar";
import BuyTicketModal from "../../src/components/BuyTicketModal";
import axios from "axios";

const Ticket = () => {
  const router = useRouter();
  const [isBuyTicketModalOpen, setIsBuyTicketModalOpen] = useState(false);
  const [cardId, setCardId] = useState();
  const [listCardByUser, setListCardByUser] = useState([]);

  const showBuyTicketModal = () => {
    setIsBuyTicketModalOpen(true);
  };
  const handleBuyTicketCancel = () => {
    setIsBuyTicketModalOpen(false);
  };

  const columns = [
    {
      title: "Mã thẻ",
      dataIndex: "_id",
      key: "_id",
      width: 200,
    },
    {
      title: "Trạng thái thẻ",
      dataIndex: "IsActive",
      key: "IsActive",
      width: 200,
    },
    {
      title: "Gói hiện tại",
      dataIndex: "PhieuXeTheoGoi",
      key: "PhieuXeTheoGoi",
      width: 200,
    },
    {
      title: "Định mức",
      dataIndex: "HanSuDungGoiGuiXe",
      key: "HanSuDungGoiGuiXe",
      width: 200,
    },
    {
      title: "Số lượng phiếu xe",
      dataIndex: "BikeTicket",
      key: "BikeTicket",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <div
            className="p-2 border rounded border-red-500 hover:bg-red-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Đóng thẻ
          </div>
          <div
            className="p-2 border rounded border-green-500 hover:bg-green-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              showBuyTicketModal();
              console.log(item);
              setCardId(item);
            }}
          >
            Mua phiếu
          </div>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const loginUser = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null;

    const params = {
      userId: loginUser._id,
    };

    axios
      .get(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/card/user", { params })
      .then(function (response) {
        // console.log(response.data);
        setListCardByUser(response.data.allCard);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col bg-white h-screen justify-between">
      <BuyTicketModal
        showModal={showBuyTicketModal}
        isModalOpen={isBuyTicketModalOpen}
        handleCancel={handleBuyTicketCancel}
        inputCardId={cardId}
      ></BuyTicketModal>
      <div className="items-start">
        <NavBar></NavBar>
        <div className="pt-5 pl-[200px]">
          <div className="font-bold text-[24px]">Danh sách thẻ</div>
          <div className="flex mt-5">
            <Table
              dataSource={listCardByUser}
              columns={columns}
              size={"large"}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full bg-sky-50 justify-center items-center p-5 mt-5 ">
        © 2022 Copyright: Nguyễn Phạm Minh Triết
      </div>
    </div>
  );
};
export default Ticket;
