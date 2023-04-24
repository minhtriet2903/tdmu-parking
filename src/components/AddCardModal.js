import React, { useEffect, useState } from "react";
import { Input, Modal, message, notification } from "antd";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../../src/firebase";
import { set, ref, onValue, remove, update } from "firebase/database";

const AddCardModal = ({ isModalOpen, showModal, handleCancel, reloadCartData, setReloadCartData }) => {
  const [newCardId, setNewCardId] = useState("");
  const [reset, setReset] = useState(false);

  //read
  useEffect(() => {
    if (reset == false) {
      set(ref(db, `RFIDInfo`), "");
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          console.log("data", data);
          if (data.RFIDInfo) setNewCardId(data.RFIDInfo.RFID_IN);
          // Object.values(data).map((todo) => {
          //   setTodos((oldArray) => [...oldArray, todo]);
          // });
        }
      });
    }
  }, [reset]);

  const hanldeAddAccount = () => {
    let params = {
      hardCardId: newCardId,
    };
    axios
      .get(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/cardByHardCardId", {
        params,
      })
      .then(function (response) {
        if (response.data.length > 0) {
          notification.open({
            message: "Card đã tồn tại!!",
            duration: 2,
          });
        } else {
          axios
            .post(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/card", {
              hardCardId: newCardId,
            })
            .then(function (response) {
              console.log(response);
              handleCancel();
              setReloadCartData(!reloadCartData)
              setNewCardId('')
              notification.open({
                message: "Thành công!!",
                duration: 2,
              });
             
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        // handle error

        console.log(error);
      });
  };

  return (
    <>
      <Modal
        title="Thêm thẻ mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="flex justify-center"
      >
        <div
          className="w-[400px] items-center flex h-[50px] rounded-md
        justify-center cursor-pointer"
        >
          <div className="w-2/5 flex items-center">
            Mã thẻ{" "}
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
              onChange={(e) => setNewCardId(e.target.value)}
              value={newCardId}
            />
          </div>
        </div>
        <div className="flex justify-center m-4">
          <button
            className="bg-sky-100 rounded hover:bg-blue-800 hover:text-white
          font-semibold p-2 cursor-pointer w-2/3"
            onClick={hanldeAddAccount}
          >
            Thêm thẻ
          </button>
        </div>
      </Modal>
    </>
  );
};
export default AddCardModal;
