import React from "react";

export default function Button({ title, onClick }) {
  return (
    <button
      className="w-[200px] h-[30px] cursor-pointer bg-whitesmoke border-2 border-[#003365] text-[#014488] rounded-[30px] font-system font-semibold text-[14px] my-[7px] hover:bg-gray-200 hover:border-[#014488] hover:text-[#014488]"
      onClick={onClick}
    >
      {title}
    </button>
  );
}