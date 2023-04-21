import React, { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import axios from "axios";
const RegisterModal = ({ isModalOpen, showModal, handleCancel }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    axios
      .post(process.env.NEXT_PUBLIC_LOCAL_API_DOMAIN + "/users", {
        email: email,
        name: userName,
      })
      .then(function (re) {
        if (re.status == 201) {
          console.log(re.data.user);
          notification.open({
            message: "Đăng ký mới thành công!!",
            duration: 2,
          });

          handleCancel();
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <Modal
      title="Đăng Ký"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="flex justify-center"
    >
      <div className="flex justify-center">
        <div>
          <div className="flex flex-col justify-around h-[120px]">
            <Input
              placeholder="Nhập tên đăng nhập"
              className="!rounded !w-[300px]"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <Input
              placeholder="Nhập email đăng nhập"
              className="!rounded !w-[300px]"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              placeholder="Nhập mật khẩu"
              className="!rounded !w-[300px]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex justify-center">
            <div
              className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300"
              onClick={handleRegister}
            >
              Đăng ký
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RegisterModal;
