import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../assets/linkedinLogo.png";
import user from "../../assets/user.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import { getAllUsers } from "../../api/FirestoreAPI";
import ProfilePopup from "./ProfilePopup";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();
  
  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      const searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    const debounced = setTimeout(() => {
      handleSearch();
    }, 1000);
    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  
  return (
    <div className="flex items-center w-full h-16 bg-white bg-opacity-90">
      {popupVisible && (
        <div className="absolute right-2 top-16 z-50">
          <ProfilePopup />
        </div>
      )}

      <img className="w-16 ml-5" src={LinkedinLogo} alt="LinkedinLogo" />

      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="flex items-center justify-between w-2/5 ml-8">
          <AiOutlineSearch
            size={30}
            className="text-gray-600 cursor-pointer hover:text-black"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={30}
            className="text-gray-600 cursor-pointer hover:text-black"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            size={30}
            className="text-gray-600 cursor-pointer hover:text-black"
            onClick={() => goToRoute("/connections")}
          />
          <BsBriefcase size={30} className="text-gray-600 cursor-pointer hover:text-black" />
          <AiOutlineMessage
            size={30}
            className="text-gray-600 cursor-pointer hover:text-black"
          />
          <AiOutlineBell
            size={30}
            className="text-gray-600 cursor-pointer hover:text-black"
          />
        </div>
      )}

      <img
        className="w-10 h-10 rounded-full object-cover absolute right-8 cursor-pointer"
        src={currentUser?.imageLink}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length > 0 && (
        <div className="absolute left-24 top-15 w-60 bg-white border border-gray-400 rounded-lg">
          {filteredUsers.length === 0 ? (
            <div className="p-2">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 p-2 cursor-pointer rounded-lg hover:bg-gray-300"
                onClick={() => openUser(user)}
              >
                <img
                  src={user}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="user"
                />
                <p className="font-system text-lg">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
