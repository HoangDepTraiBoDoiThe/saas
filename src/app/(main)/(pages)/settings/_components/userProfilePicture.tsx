import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  userImage: string | null;
  onDelete?: any;
  onUpload?: any;
};

const UserProfilePicture = ({ onDelete, onUpload, userImage }: Props) => {
  const Router = useRouter();

  const removeProfileImage = () => {
    const res = onDelete();
    if (res) {
      Router.refresh();
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-lg text-white">User profile</h1>
      <div className="flex flex-col h-[30vh] items-center justify-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={userImage ?? ""}
            alt="profile"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-0 right-0">
            <button
              onClick={removeProfileImage}
              className="bg-red-500 text-white rounded-full p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={onUpload}
          className="bg-primary text-white rounded-md p-2 mt-2"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UserProfilePicture;
