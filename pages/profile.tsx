import React, { useEffect, useRef, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { RiAddCircleFill } from "react-icons/ri";
import ProgressBar from "../components/ProgressBar";
import { avatars } from "../utils/avatar";
import { getUser, logOut, setUser, updateUserData } from "../services/user";
import { ICategory, IUser } from "../types";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CgSpinner } from "react-icons/cg";
import Modal from "../components/Modal";
import QuizDetails from "../components/QuizDetails";

function Profile() {
  const [openImageBox, setOpenImageBox] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [profile, setProfile] = useState<IUser>();
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<Number>();
  const [isOpenModal, setOpenModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setProfile(user);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenImageBox(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const notifyToast = (message: string) =>
    toast.success(<p className="text-sm">{message}</p>, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const onImageHandler = async (image: string) => {
    setOpenImageBox(false);
    setLoadingImage(true);

    try {
      let res = await updateUserData(profile?._id, { image });
      let data = await res.json();
      if (data.message) {
        setLoadingImage(false);
        setSelectedImage(image);
        notifyToast("Image updated!");
        setUser(data.updatedUser);
      } 
    } catch (error) {
      notifyToast("Request Failed");
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div
        className="md:absolute w-full md:w-5/6 top-2/4 left-2/4
        md:translate-x-2/4 md:translate-y-2/4 h-screen "
      >
        <div className="h-full py-8 bg-light-secondary text-center relative rounded-xl">
          <div className="flex items-center justify-between mx-6 ">
            <span className=" text-2xl fill-white relative">
              <TiArrowBack
                onClick={() => router.push("/")}
                className="cursor-pointer inline"
              />
            </span>

            <span
              onClick={() => logOut()}
              className="cursor-pointer text-primary text-sm font-bold"
            >
              Logout <FiLogOut className="inline" />
            </span>
          </div>

          <div className="pb-4">
            <div className="relative">
              <div className="relative w-24 m-auto">
                <div
                  ref={ref}
                  className="w-24 m-auto"
                  onClick={() => setOpenImageBox(true)}
                >
                  <div className="relative">
                    {loadingImage && (
                      <CgSpinner className="animate-spin block m-auto absolute right-[24%] top-[24%] w-12 h-12" />
                    )}
                    <img
                      className={`${
                        loadingImage && "opacity-20"
                      } rounded-full p-2 w-24 h-24 cursor-pointer`}
                      src={selectedImage || profile?.image}
                      alt="avatar"
                    />
                  </div>
                  <RiAddCircleFill className="absolute text-3xl fill-slate-secondary bottom-0 right-5" />
                </div>
                {openImageBox && (
                  <div className="absolute md:top-1/2 -left-24 md:left-24 bg-white p-4 w-72 rounded-lg">
                    <p className="text-secondary pb-2 font-bold">
                      Choose Your Avatar
                    </p>
                    <div ref={ref} className="flex gap-4 flex-wrap">
                      {avatars.map((item) => (
                        <img
                          src={item.image}
                          key={item.id}
                          className="w-12 cursor-pointer rounded-full hover:scale-110"
                          onClick={() => onImageHandler(item.image)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-tourquise mb-2">
              {" "}
              {profile?.username}
            </p>
            <span className="text-sm mr-3 text-tourquise font-semibold">
              Joined{" "}
              {new Date(profile?.created_at)
                .toDateString()
                .replace(/T.*/, "")
                .split("-")
                .reverse()
                .join("-")}{" "}
            </span>
          </div>
          <hr className="border-t-none border-b border-[1px] border-[#38404ecf]" />
          <div className="pt-4 text-center">
            <div className="mt-12 mb-8">
              {profile?.category.length ? (
                <>
                  <p className="font-bold text-gray-500 text-xl mb-12">
                    {" "}
                    Highest Stats{" "}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-2">
                    {profile?.category.map((item: ICategory, index: number) => (
                      <div  key={item._id}>
                        <div
                        
                          onClick={() => {
                            setOpenModal(true), setSelectedIndex(index);
                          }}
                         
                          className="text-center cursor-pointer hover:opacity-40"
                        >
                          <p className="font-bold md:text-lg lg:text-xl mb-2">
                            {item.name}
                          </p>
                          <ProgressBar width={160} score={item.score} />
                        </div>
                        {isOpenModal && selectedIndex === index && (
                          <Modal
                            children={<QuizDetails item={item} />}
                            handleCloseModal={handleCloseModal}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="font-medium  text-lg  tracking-widest text-gray-500 my-32">
                  {" "}
                  No Quiz Record
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Profile;


