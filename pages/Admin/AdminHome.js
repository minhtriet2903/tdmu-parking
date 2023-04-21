import React, { useEffect, useState } from "react";
import { Input, Radio, Space, Table, message } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCamera } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../src/firebase";
import { set, ref, onValue, remove, update } from "firebase/database";
import AddUserModal from "../../src/components/AddUserModal";

export default function Home({ data }) {
  const [cardId, setCardId] = useState("");
  const [reset, setReset] = useState(false);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [messageApi, contextHolder] = message.useMessage();

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

  //reset data in firebase
  useEffect(() => {
    if (reset == false) {
      set(ref(db, `cardId`), "");
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
    }
  }, [reset]);

  useEffect(() => {
    if (cardId != "" && cardId != null) {
      axios
        .get(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/card/" + cardId, {})
        .then(function (response) {
          console.log(response.status);
          if (response.data) {
            if (response.data.success) {
              if (response.data.BikeTicket <= 0) {
                messageApi.open({
                  type: "error",
                  content: "This account has not enough ticket to charge",
                });
              } else {
                axios
                  .put(
                    process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN +
                      "/cardBikeTicket",
                    {
                      id: cardId,
                      bikeTicket: response.data.BikeTicket - 1,
                    }
                  )
                  .then(function (response) {
                    console.log(response);
                    messageApi.open({
                      type: "success",
                      content: "Success",
                    });
                    oncancel();
                  })
                  .catch(function (error1) {
                    console.log(error1);
                    messageApi.open({
                      type: "error",
                      content: "ID not found",
                    });
                  });
              }
            }
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
  }, [cardId]);

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <div className="flex items-center mt-10 ">
          <div className="flex ">
            <div className="text-lg">Mã số thẻ</div>
            <div className="text-lg font-bold ml-5 w-[200px] border">
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
        <div className="flex h-[400px] w-3/4 m-10 border">
          <div className="w-1/2 border-r flex flex-col items-center">
            <div className="text-lg font-bold mt-10">Thông tin</div>
            <div className="flex justify-between mt-10 w-3/4">
              <div className="text-lg">Họ tên</div>
              <div className="text-lg font-bold">Nguyễn Văn A</div>
            </div>
            <div className="flex justify-between mt-10 w-3/4">
              <div className="text-lg">Mã số sinh viên</div>
              <div className="text-lg font-bold">1924987653</div>
            </div>
            <div className="flex justify-between mt-10 w-3/4">
              <div className="text-lg">Số tiền thanh toán</div>
              <div className="text-lg font-bold">3 000</div>
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
