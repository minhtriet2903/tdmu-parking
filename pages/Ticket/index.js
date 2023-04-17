import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, Input, Select, DatePicker, Table, Space } from "antd";
import React from "react";
import { useRouter } from "next/router";
import NavBar from "../../src/components/NavBar";

const Ticket = () => {
  const router = useRouter();

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Mã thẻ",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Trạng thái thẻ",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Ngày kích hoạt",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Gói hiện tại",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Định mức",
      dataIndex: "age",
      key: "age",
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
            }}
          >
            Mua phiếu
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col bg-white h-screen justify-between">
      <div className="items-start">
        <NavBar></NavBar>
        <div className="pt-5 pl-[200px]">
          <div className="font-bold text-[24px]">Danh sách thẻ</div>
          <div className="flex mt-5">
            <Table dataSource={dataSource} columns={columns} size={"large"} />
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
