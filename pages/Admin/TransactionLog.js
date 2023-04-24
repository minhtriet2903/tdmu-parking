import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table, DatePicker, Select } from "antd";
import axios from "axios";
const { RangePicker } = DatePicker;

export default function TransactionLog({ data, reloadTransLog, setReloadTransLog }) {
  const columns = [
    {
      title: "Mã giao dịch",
      dataIndex: "_id",
      key: "_id",
      width: 200,
    },
    {
      title: "Nội dung giao dịch",
      dataIndex: "TransType",
      key: "TransType",
      width: 150,
    },
    {
      title: "Hình thức giao dịch",
      dataIndex: "Method",
      key: "Method",
      width: 150,
    },
    {
      title: "Số tiền giao dịch",
      dataIndex: "Amount",
      key: "Amount",
      width: 200,
    },
    {
      title: "Trạng thái giao dịch",
      dataIndex: "Status",
      key: "Status",
      width: 200,
    },
    {
      title: "Ngày giao dịch",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      render: (item) => (
        <Space size="middle">
          <div
            onClick={(e) => {
              e.stopPropagation();
              axios
                .post(
                  process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN +
                    "/momoPayment/checkOrderStatus",
                  {
                    requestId: item.paymentId,
                  }
                )
                .then(function (response) {
                  // console.log(response.data);
                  axios
                    .put(
                      process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/transaction",
                      {
                        id: item._id,
                        status: response.data.data.message,
                      }
                    )
                    .then(function (re) {
                      setReloadTransLog(!reloadTransLog)
                      console.log(re.data);
                    })
                    .catch(function (error) {
                      // handle error
                      console.log(error);
                    });
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                });
            }}
            className="p-2 border border-green-300 rounded hover:bg-green-200 cursor-pointer"
          >
            Cập nhật trạng thái
          </div>
        </Space>
      ),
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="flex flex-col bg-[#F1F6FD] h-[580px] m-5 rounded-xl pt-5">
      <div className="flex m-5 ml-[40px]">
        <div>
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "NapTien",
                label: "Nạp tiền",
              },
              {
                value: "MuaPhieu",
                label: "Mua Phiếu",
              },
            ]}
          />
        </div>
        <div className="ml-5">
          <RangePicker />
        </div>
      </div>
      <div className="justify-center flex p-4">
        <Table
          columns={columns}
          dataSource={data}
          size={"large"}
          scroll={{
            y: 330,
          }}
        />
      </div>
    </div>
  );
}
