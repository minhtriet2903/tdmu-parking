import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Input, Space, Table, DatePicker, Select, message } from "antd";
import axios from "axios";

export default function Settings({ userData, setUserDetail }) {
  return (
    <div
      className="flex bg-[#e6f4ff] h-[550px] m-5 rounded-xl items-start
         pt-3 flex-col"
    >
      Setting
    </div>
  );
}
