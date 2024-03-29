import React, { useEffect, useState } from "react";
import { Input, Modal, message, Radio } from "antd";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { set, ref, onValue, remove, update } from "firebase/database";

const BuyTicketModal = ({
  isModalOpen,
  showModal,
  handleCancel,
  inputCardId,
  reloadCartData,
   setReloadCartData
}) => {
  const [cardId, setCardId] = useState(inputCardId);
  const [userId, setUserId] = useState("");
  const [reset, setReset] = useState(false);
  const [chargeAmount, setChargeAmount] = useState("");
  const [selectedPayType, setSelectedPayType] = useState("");
  const [userInfor, setUserInfor] = useState();
  const [selectCharge, setSelectCharge] = useState();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isModalOpen && inputCardId) {
      axios
        .get(
          process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN +
            "/users/" +
            inputCardId.userId,
          {}
        )
        .then(function (response) {
          // console.log(response.data);
          setUserInfor(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [isModalOpen]);

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
          if (selectCharge?.value == item.value) {
            return (
              <div
                key={index}
                className="p-2 bg-sky-100 rounded border-sky-400 border 
          cursor-pointer font-semibold m-2"
                onClick={() => {
                  setSelectCharge(item);
                }}
              >
                {item.label} --- {item.value}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
          cursor-pointer font-semibold m-2"
                onClick={() => {
                  setSelectCharge(item);
                }}
              >
                {item.label} --- {item.value}
              </div>
            );
          }
        })}
        <div></div>
      </div>
    );
  };

  const renderMuaTheoGoi = () => {
    return (
      <div>
        {muaTheoGoi.map((item, index) => {
          if (selectCharge?.value == item.value) {
            return (
              <div
                className="p-2 bg-sky-100 rounded border-sky-400 border 
            cursor-pointer font-semibold m-2"
                key={index}
                onClick={() => {
                  setSelectCharge(item);
                }}
              >
                {item.label} --- {item.value}
              </div>
            );
          } else {
            return (
              <div
                className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
            cursor-pointer font-semibold m-2"
                key={index}
                onClick={() => {
                  setSelectCharge(item);
                }}
              >
                {item.label} --- {item.value}
              </div>
            );
          }
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
    let isAvailableCharge =
      userInfor.CurrentAmount - parseInt(selectCharge?.value);
    if (isAvailableCharge && isAvailableCharge < 0) {
      messageApi.open({
        type: "error",
        content: "This account has not enough money to charge",
      });
    } else {
      if (selectCharge?.label.includes("Gói")) {
        let isSuccess = false
        var date = new Date();
        axios
          .put(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/cardBikeTicket", {
            id: inputCardId._id,
            phieuXeTheoGoi: selectCharge?.label + "---" + selectCharge?.value,
            hanSuDung: date.getDate() + 7,
          })
          .then(function (response) {
            console.log(response);
            // isSuccess
            console.log("isSuccess1");
            handleCancel();
            setReloadCartData(!reloadCartData)
            console.log("reload1" );
            messageApi.open({
              type: "success",
              content: "Success",
            });
          
          })
          .catch(function (error1) {
            console.log(error1);
           
            messageApi.open({
              type: "error",
              content: "ID not found",
            });
          });
      } else {
        axios
          .get(
            process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN +
              "/card/" +
              inputCardId._id,
            {}
          )
          .then(function (response) {
            console.log(response.status);
            if (response.status == 200) {
              axios
                .put(
                  process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/cardBikeTicket",
                  {
                    id: inputCardId._id,
                    bikeTicket:
                      response.data.BikeTicket +
                      selectCharge.label.split(" ")[0],
                  }
                )
                .then(function (response) {
                  console.log(response);
                  console.log("isSuccess2");
                  handleCancel();
                  setReloadCartData(!reloadCartData)
                  console.log("reload" );
                  messageApi.open({
                    type: "success",
                    content: "Success",
                  });
                  
                })
                .catch(function (error1) {
                  console.log(error1);
                  messageApi.open({
                    type: "error",
                    content: "ID not found",
                  });
                });
            } else {
              messageApi.open({
                type: "error",
                content: "ID not found",
              });
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            messageApi.open({
              type: "error",
              content: "ID not found",
            });
          });
      }
    }
  };

  //read
  useEffect(() => {
    if (reset == false) {
      set(ref(db, `RFIDInfo`), "");
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          console.log("data", data);
          // setCardId(data.cardId);
          // Object.values(data).map((todo) => {
          //   setTodos((oldArray) => [...oldArray, todo]);
          // });
        }
      });
    }
  }, [reset]);

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
        <div className="w-[400px] items-center flex rounded-md cursor-pointer my-2">
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faStarOfLife}
                className="w-[8px] h-[8px] mr-2 text-red-600"
              />
            </div>
            Mã thẻ
          </div>
          <div className="flex ml-5">{inputCardId?._id}</div>
        </div>
        <div className="w-[400px] items-center flex rounded-md cursor-pointer my-2">
          <div className="flex items-center">
            <div className="flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faStarOfLife}
                className="w-[8px] h-[8px] mr-2 text-red-600"
              />
            </div>
            Mã thẻ cứng
          </div>
          <div className="flex ml-5">{inputCardId?.HardCardId}</div>
        </div>
        <div className="w-[400px] items-center flex rounded-md cursor-pointer my-2">
          <div className="flex items-center">Họ và tên</div>
          <div className="flex ml-5">{inputCardId?.userId}</div>
        </div>

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
