import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faCirclePlay,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Menu, Button, Input, Select, DatePicker } from "antd";
import React from "react";
import { useRouter } from "next/router";
import NavBar from "../../src/components/NavBar";

const User = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-white h-screen justify-between">
      <div className="items-start">
        <NavBar></NavBar>
        <div className=" flex flex-col justify-center items-center">
          <div className="font-bold text-[24px]">ỨNG DỤNG</div>
          <div className="flex w-2/3 justify-evenly mt-5">
            <div className="border px-5 py-6 rounded-xl items-center flex flex-col">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="text-[#3380FF] w-[100px] h-[100px]"
              />
              <div className="font-bold mt-8">Đăng ký nhanh chóng</div>
            </div>

            <div className="border px-5 py-6 rounded-xl items-center flex flex-col">
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="text-[#3380FF] w-[100px] h-[100px]"
              />
              <div className="font-bold mt-8">Sử dụng dễ dàng</div>
            </div>

            <div className="border px-5 py-6 rounded-xl items-center flex flex-col">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="text-[#3380FF] w-[100px] h-[100px]"
              />
              <div className="font-bold mt-8">Ứng dụng thông minh</div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center mt-10">
          <div className="font-bold text-[24px]">LIÊN KẾT</div>
          <div className="flex w-2/3 justify-evenly mt-5">
            <img
              src="https://images.careerbuilder.vn/employer_folders/lot9/221789/95340imgpsh_fullsize.jpg"
              height={150}
              width={250}
            ></img>
            <img
              src="https://images.careerbuilder.vn/employer_folders/lot9/221789/95340imgpsh_fullsize.jpg"
              height={150}
              width={250}
            ></img>
            <img
              src="https://images.careerbuilder.vn/employer_folders/lot9/221789/95340imgpsh_fullsize.jpg"
              height={150}
              width={250}
            ></img>
          </div>
        </div>
      </div>
      <div className="flex w-full bg-sky-50 justify-center items-center p-5 mt-5 ">
        © 2022 Copyright: Nguyễn Phạm Minh Triết
      </div>
    </div>
  );
};
export default User;
