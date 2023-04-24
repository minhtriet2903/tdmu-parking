import React, { useEffect, useState } from "react";
import { Input, Modal, message, notification } from "antd";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddUserModal = ({
  isModalOpen,
  showModal,
  handleCancel,
  idUserNapTien,
  setReloadUserData,
  reloadUserData
}) => {
  const [newCardId, setNewCardId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [listFreeCard, setListFreeCard] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const hanldeAddAccount = () => {
    axios
      .put(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/cardUserId", {
        id: newCardId,
        userId: idUserNapTien,
      })
      .then(function (response) {
        handleCancel()
        setReloadUserData(!reloadUserData)
        notification.open({
          message: "Thành công!!",
          duration: 2,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    if (isModalOpen) {
      axios
        .get(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/freeCard", {})
        .then(function (response) {
          setListFreeCard(response.data.allCard);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [isModalOpen]);

  return (
    <>
      {contextHolder}
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
            Mã số tài khoản
            <div className="flex items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faStarOfLife}
                className="w-[8px] h-[8px] ml-1 text-red-600"
              />
            </div>
          </div>
          <div className="w-3/5 flex">{idUserNapTien}</div>
        </div>

        <div>
          {listFreeCard.map((item, index) => {
            if (item._id == newCardId) {
              return (
                <div
                  className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
              cursor-pointer font-semibold m-2 bg-slate-300"
                  key={index}
                >
                  {item._id} --- {item.HardCardId}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="p-2 hover:bg-sky-100 rounded border-sky-400 border 
            cursor-pointer font-semibold m-2"
                  onClick={() => setNewCardId(item._id)}
                >
                  {item._id} --- {item.HardCardId}
                </div>
              );
            }
          })}
          <div></div>
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
export default AddUserModal;
