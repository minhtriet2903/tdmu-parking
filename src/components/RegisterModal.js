import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
const RegisterModal = ({
  isModalOpen,
  showModal,
  handleCancel,
  setLoginData,
}) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Modal
      title="Đăng nhập"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      className="flex justify-center"
    >
      <div className="flex justify-center">
        <div>
          <div className="flex flex-col justify-around h-[80px]">
            <Input
              placeholder="Nhập tên đăng nhập"
              className="!rounded !w-[300px]"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <Input
              placeholder="Nhập mật khẩu"
              className="!rounded !w-[300px]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex justify-center">
            <div className="font-bold p-2 border-sky-300 border flex w-fit my-2 rounded cursor-pointer hover:bg-sky-300">
              Đăng ký
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RegisterModal;
