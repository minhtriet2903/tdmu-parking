import React, { useEffect, useState } from "react";
import { Input, Radio, Space, Table, message, notification } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCamera } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../src/firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import AddUserModal from "../../src/components/AddUserModal";

export default function Home({ data }) {
  const [cardId, setCardId] = useState("");
  const [reset, setReset] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [cardInfo, setCardInfo] = useState();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [messageApi, contextHolder] = message.useMessage();

  //read
  useEffect(() => {
    if (reset == false) {
      set(ref(db, `RFIDInfo`), "");
    }
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        console.log("data", data.RFIDInfo);
        if (data.RFIDInfo) {
          setCardId(data.RFIDInfo.RFID_IN);
        }
        // setCardId(data.cardId);
        // Object.values(data).map((todo) => {
        //   setTodos((oldArray) => [...oldArray, todo]);
        // });
      }
    });
  }, []);

  //reset data in firebase
  useEffect(() => {
    if (reset == false) {
      set(ref(db, `RFIDInfo`), "");
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          console.log("reset data", data);
          // setCardId(data.cardId);
          // Object.values(data).map((todo) => {
          //   setTodos((oldArray) => [...oldArray, todo]);
          // });
        }
      });
    }
  }, [reset]);

  useEffect(() => {
    if (cardId != "" && cardId != null) {
      let params = {
        hardCardId: cardId,
      };
      axios
        .get(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/cardByHardCardId", {
          params,
        })
        .then(function (response) {
          // console.log(response.status);
          if (response.status == 200) {
            setCardInfo(response.data[0]);

            if (response.data.BikeTicket <= 0) {
              notification.open({
                message: "Thẻ không còn đủ phiếu xe để thanh toán!!",
                duration: 2,
              });
            } else {
              axios
                .put(
                  process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/cardBikeTicket",
                  {
                    id: cardId,
                    bikeTicket: response.data.BikeTicket - 1,
                  }
                )
                .then(function (res1) {
                  console.log(res1);
                  notification.open({
                    message: "Thành công!!",
                    duration: 2,
                  });
                  oncancel();
                })
                .catch(function (error1) {
                  console.log(error1);
                  notification.open({
                    message: "Thẻ không tồn tại!!",
                    duration: 2,
                  });
                });
            }

            axios
              .get(
                process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN +
                  "/users/" +
                  response.data[0].userId,
                {}
              )
              .then(function (re) {
                if (re.status == 200) {
                  setUserInfo(re.data);
                }
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
  }, [cardId]);

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center mt-10 ">
          <div className="flex ">
            <div className="text-lg">Mã số thẻ</div>
            <div className="text-lg font-bold ml-5 w-[200px] border text-center">
              {cardId}
            </div>
          </div>
          {/* <div
            className="border-2 font-bold w-[100px] text-center hover:bg-blue-400
      hover:text-white cursor-pointer my-4 rounded"
            onClick={showModal}
          >
            Thêm thẻ
          </div> */}
        </div>
        <div className="flex w-5/6 m-10 border">
          <div className="w-1/2 border-r flex flex-col items-center">
            <div className="text-lg font-bold mt-10">Thông tin</div>
            <div className="flex justify-between mt-10 w-5/6">
              <div className="text-lg">Họ tên</div>
              <div className="text-lg font-bold">{userInfo?.Name}</div>
            </div>
            <div className="flex justify-between mt-10 w-5/6">
              <div className="text-lg">Mã số sinh viên</div>
              <div className="text-lg font-bold">{userInfo?.Email}</div>
            </div>
            <div className="flex justify-between mt-10 w-5/6">
              <div className="text-lg">Số lượt gửi xe hiện có</div>
              <div className="text-lg font-bold">{cardInfo?.BikeTicket}</div>
            </div>
            <div className="flex justify-between mt-10 w-5/6">
              <div className="text-lg">Gói gửi xe hiện có</div>
              <div className="text-lg font-bold">
                {cardInfo?.PhieuXeTheoGoi}
              </div>
            </div>
            <div className="flex justify-between my-10 w-5/6">
              <div className="text-lg">Hạn sử dụng</div>
              <div className="text-lg font-bold">
                {cardInfo?.HanSuDungGoiGuiXe}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-[#3380FF] w-[100px] h-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
