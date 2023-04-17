import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, Input, Select, DatePicker, Table } from "antd";
import React from "react";
import { useRouter } from "next/router";
import NavBar from "../../src/components/NavBar";

const Trans = () => {
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
      title: "Mã giao dịch",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Nội dung giao dịch",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Hình thức giao dịch",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Số tiền giao dịch",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Thẻ giao dịch",
      dataIndex: "age",
      key: "age",
      width: 200,
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
  ];

  return (
    <div className="flex flex-col bg-white h-screen justify-between">
      <div className="items-start">
        <NavBar></NavBar>
        <div className="pt-5 pl-[200px]">
          <div className="flex">
            <div className="font-bold text-[24px] mr-10">Lịch sử giao dịch</div>
            <div
              className="p-2 border rounded border-green-500 hover:bg-green-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Nạp tiền vào tài khoản
            </div>
          </div>
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
export default Trans;
