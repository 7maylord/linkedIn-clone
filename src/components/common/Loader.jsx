import React from "react";
import { Space, Spin } from "antd";

export default function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <p className="font-system font-medium text-gray-900 text-2xl">
        Loading.. Please Wait..
      </p>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
