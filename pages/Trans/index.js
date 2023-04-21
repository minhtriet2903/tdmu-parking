import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, Input, Select, DatePicker, Table, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../../src/components/NavBar";
import UserNapTienModal from "../../src/components/UserNapTienModal";
import axios from "axios";

const Trans = () => {
  const router = useRouter();
  const [isVisibleNapTienModal, setIsVisibleNapTienModal] = useState(false);
  const [listTrans, setListTrans] = useState([]);

  useEffect(() => {
    const loginUser = localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null;

    let params = {
      userId: loginUser._id,
    };
    axios
      .get(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/transaction/user", {
        params,
      })
      .then(function (response) {
        // console.log(response.data);
        setListTrans(response.data.Transaction);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

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

  const showNapTienModal = () => {
    setIsVisibleNapTienModal(true);
  };
  const handleCancelNapTien = () => {
    setIsVisibleNapTienModal(false);
  };

  return (
    <div className="flex flex-col bg-white h-screen justify-between">
      <UserNapTienModal
        showModal={showNapTienModal}
        isModalOpen={isVisibleNapTienModal}
        handleCancel={handleCancelNapTien}
      ></UserNapTienModal>
      <div className="items-start">
        <NavBar></NavBar>
        <div className="pt-5 px-[100px]">
          <div className="flex">
            <div className="font-bold text-[24px] mr-10">Lịch sử giao dịch</div>
            <div
              className="p-2 border rounded border-green-500 hover:bg-green-200 cursor-pointer"
              onClick={(e) => {
                showNapTienModal();
              }}
            >
              Nạp tiền vào tài khoản
            </div>
          </div>
          <div className="flex mt-5">
            <Table dataSource={listTrans} columns={columns} size={"large"} />
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
