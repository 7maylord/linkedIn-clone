import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "../../api/FirestoreAPI";
import ModalComponent from "../Modal";
import { uploadPostImage } from "../../api/ImageUpload";
import PostsCard from "./PostsCard";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: moment().format("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: uuidv4(),
      userID: currentUser.id,
      postImage: postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="w-[550px] bg-whitesmoke mt-[100px] border border-[#b7b7b7] rounded-[7px] flex flex-col items-center">
        <img
          className="w-[100px] h-[100px] object-cover rounded-full mt-[-60px] border border-[#b7b7b7] p-[1px]"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <p className="font-semibold font-system">{currentUser?.name}</p>
        <p className="font-system mt-[-15px]">{currentUser?.headline}</p>
      </div>

      <div className="w-[550px] h-[120px] bg-whitesmoke mt-[30px] border border-[#b7b7b7] rounded-[7px] flex justify-around items-center">
        <img
          className="w-[60px] h-[60px] object-cover rounded-full"
          src={currentUser?.imageLink}
          alt="imageLink"
        />
        <button
          className="w-[80%] h-[50px] text-left text-[rgba(84,84,84,0.89)] bg-whitesmoke outline-none border border-[#b7b7b7] rounded-[30px] ml-[-30px] cursor-pointer p-[15px] font-semibold text-[14px] font-system transition-colors duration-200 hover:bg-[#dcdbdb]"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
          }}
        >
          Start a Post
        </button>
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div>
        {allStatuses.map((posts) => (
          <div key={posts.id}>
            <PostsCard posts={posts} getEditData={getEditData} />
          </div>
        ))}
      </div>
    </div>
  );
}
