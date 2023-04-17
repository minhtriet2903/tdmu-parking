import React, { useEffect, useState } from "react";
import { Input, Modal, message, Radio } from "antd";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { set, ref, onValue, remove, update } from "firebase/database";

const BuyTicketModal = ({ isModalOpen, showModal, handleCancel }) => {
  const [cardId, setCardId] = useState("");
  const [userId, setUserId] = useState("");
  const [reset, setReset] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");
  const [selectedPayType, setSelectedPayType] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const payTypeOptions = [
    { label: "Mua lượt gửi xe", value: "ticket" },
    { label: "Mua gói gửi xe", value: "combo" },
  ];

  const [muaTheoGoi, setMuaTheoGoi] = useState([
    {
      value: "30000",
      label: "Gói 1 tuần",
    },
    {
      value: "55000",
      label: "Gói 2 tuần",
    },
    {
      value: "100000",
      label: "Gói 1 tháng",
    },
    {
      value: "250000",
      label: "Gói 3 tháng",
    },
  ]);

  const [muaTheoVe, setMuaTheoVe] = useState([
    {
      value: "3000",
      label: "1 lượt",
    },
    {
      value: "5000",
      label: "2 lượt",
    },
    {
      label: "5 lượt",
      value: "12000",
    },
    {
      value: "22000",
      label: "10 lượt",
    },
  ]);

  const renderMuaTheoVe = () => {
    return (
      <div>
        {muaTheoVe.map((item, index) => {
          return (
            <div
              key={index}
              className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
          cursor-pointer font-semibold m-2"
            >
              {item.label} --- {item.value}
            </div>
          );
        })}
        <div></div>
      </div>
    );
  };

  const renderMuaTheoGoi = () => {
    return (
      <div>
        {muaTheoGoi.map((item, index) => {
          return (
            <div
              className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
          cursor-pointer font-semibold m-2"
              key={index}
            >
              {item.label} --- {item.value}
            </div>
          );
        })}
        <div></div>
      </div>
    );
  };

  const onChange4 = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setSelectedPayType(value);
  };

  const hanldeBuyTicket = () => {
    axios
      .get("http://localhost:5035/users/" + userId, {})
      .then(function (response) {
        if (response.status == 200) {
          let isAvailableCharge =
            response.CurrentAmount - parseInt(chargeAmount);
          if (isAvailableCharge && isAvailableCharge < 0) {
            messageApi.open({
              type: "error",
              content: "This account has not enough money to charge",
            });
          } else {
            axios
              .put("http://localhost:5035/users", {
                id: userId,
                chargeAmount: isAvailableCharge,
              })
              .then(function (response) {
                console.log(response);
                messageApi.open({
                  type: "success",
                  content: "Success",
                });
                oncancel();
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  //read
  useEffect(() => {
    if (reset == false) {
      set(ref(db, `cardId`), "");
    }
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        // console.log("data", data);
        setCardId(data.cardId);
        // Object.values(data).map((todo) => {
        //   setTodos((oldArray) => [...oldArray, todo]);
        // });
      }
    });
  }, []);

  return (
    <>
      {contextHolder}
      <Modal
        title="Mua phiếu xe"
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
        <div
          className="w-[400px] items-center flex h-[50px] rounded-md
        justify-center cursor-pointer"
        >
          <div className="w-2/5 flex items-center">
            Mã thẻ
            <div className="flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faStarOfLife}
                className="w-[8px] h-[8px] ml-1 text-red-600"
              />
            </div>
          </div>
          <div className="w-3/5 flex">
            <Input
              className="!mr-2"
              placeholder="card id"
              onChange={(e) => setCardId(e.target.value)}
              value={cardId}
            />
          </div>
        </div>

        {selectedPayType == "ticket" && renderMuaTheoVe()}
        {selectedPayType == "combo" && renderMuaTheoGoi()}

        <div className="flex justify-center m-4">
          <button
            className="bg-sky-100 rounded hover:bg-blue-800 hover:text-white
          font-semibold p-2 cursor-pointer w-2/3"
            onClick={hanldeBuyTicket}
          >
            Mua phiếu
          </button>
        </div>
      </Modal>
    </>
  );
};
export default BuyTicketModal;
