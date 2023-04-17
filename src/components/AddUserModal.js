import React, { useState } from "react";
import { Input, Modal, message } from "antd";
import { faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddUserModal = ({ isModalOpen, showModal, handleCancel }) => {
  const [newCardId, setNewCardId] = useState("");
  const [studentCode, setStudentCode] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const hanldeAddAccount = () => {
    axios
      .get("http://localhost:5035/users?cardId=" + newCardId, {})
      .then(function (response) {
        if (response.data.User.length > 0) {
          messageApi.open({
            type: "error",
            content: "This account has already existed",
          });
        } else {
          axios
            .post("http://localhost:5035/users", {
              cardId: newCardId,
              studentCode: studentCode,
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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

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
        <div
          className="w-[400px] items-center flex h-[50px] rounded-md
        justify-center cursor-pointer"
        >
          <div className="w-2/5 flex items-center">
            Mã số sinh viên{" "}
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
              placeholder="student code"
              onChange={(e) => setStudentCode(e.target.value)}
              value={studentCode}
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
export default AddUserModal;
