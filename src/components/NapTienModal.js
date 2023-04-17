import React, { useEffect, useState } from "react";
import { Input, Modal, message, Radio } from "antd";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useRouter } from "next/router";

const NapTienModal = ({
  isModalOpen,
  showModal,
  handleCancel,
  idUserNapTien,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedPayType, setSelectedPayType] = useState("");
  const [selectMoney, setSelectMoney] = useState(0);
  const router = useRouter();

  const payTypeOptions = [
    { label: "Tiền mặt", value: "cash" },
    { label: "MOMO", value: "momo" },
    { label: "BIDV", value: "bidv" },
  ];

  const [cashOptions, setCashOptions] = useState([
    {
      value: "5000",
      label: "5 000",
    },
    {
      value: "15000",
      label: "15 000",
    },
    {
      value: "20000",
      label: "20 000",
    },
    {
      value: "50000",
      label: "50 000",
    },
  ]);

  const onChange4 = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setSelectedPayType(value);
  };

  const handleSelectMoney = (amount) => {
    setSelectMoney(parseInt(amount));
  };

  const renderPayType = () => {
    return (
      <div>
        {cashOptions.map((item, index) => {
          if (item.value == selectMoney) {
            return (
              <div
                className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
            cursor-pointer font-semibold m-2 bg-slate-300"
                key={index}
              >
                {item.label}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
            cursor-pointer font-semibold m-2"
                onClick={() => handleSelectMoney(item.value)}
              >
                {item.label}
              </div>
            );
          }
        })}
        <div></div>
      </div>
    );
  };

  const handleNapTien = () => {
    if (selectedPayType == "cash") {
    } else if (selectedPayType == "momo") {
      axios
        .post("http://localhost:5035/momoPayment", {})
        .then(function (response) {
          console.log(response);
          if (response.status == 201) {
            // console.log(response.data.data.payUrl);
            router.push(response.data.data.payUrl);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Nạp tiền vào tài khoản"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="flex justify-center"
      >
        <div
          className="w-[400px] items-center flex h-[50px] rounded-md
        justify-center cursor-pointer"
        >
          <Radio.Group
            options={payTypeOptions}
            onChange={onChange4}
            value={selectedPayType}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        {renderPayType()}
        <div className="flex justify-center">
          <div
            className="p-2 hover:bg-orange-300 rounded bg-sky-400 border : ;
          cursor-pointer font-semibold m-2 w-1/2 flex justify-center text-yellow-50 hover:text-black"
            onClick={handleNapTien}
          >
            Thanh toán
          </div>
        </div>
      </Modal>
    </>
  );
};
export default NapTienModal;
