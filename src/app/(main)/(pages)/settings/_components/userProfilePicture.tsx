"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";
import React from "react";

type Props = {
  userImage: string | null;
  authId: string;
};

const UserProfilePicture = ({ authId, userImage }: Props) => {
  console.log(userImage);
  const removeProfileImage = async () => {
    await db.user
      .update({
        where: { clerkId: authId },
        data: { profileImage: "" },
      })
      .catch((err) => console.error(err));
  };
  const uploadProfileImage = async (image?: string) => {
    await db.user
      .update({
        where: { clerkId: authId },
        data: { profileImage: image },
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-lg text-white">User profile</h1>
      <div className="flex flex-col gap-4 h-[30vh] items-center justify-center">
        <div className="relative w-24 h-24 rounded-full">
          <div className="rounded-full overflow-hidden">
            <Image
              src={userImage ?? ""}
              alt="profile"
              className="object-cover w-full h-full"
              width={1980}
              height={1080}
            />
          </div>
          <div className="absolute top-0 right-0 z-50">
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
        <Button onClick={() => uploadProfileImage}>Upload image</Button>
      </div>
    </div>
  );
};

export default UserProfilePicture;
