import ProfileForm from "@/components/forms/profile-form";
import React from "react";
import UserProfilePicture from "./_components/userProfilePicture";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

type Props = {};

const page = async (props: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const user = await db.user.findUnique({ where: { clerkId: authUser.id } });

  const updateUserInfo = async (userName: string) => {
    await db.user
      .update({
        where: { clerkId: authUser.id },
        data: { name: userName },
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sticky top-0 z-10 flex  items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <UserProfilePicture
        authId={authUser.id}
        userImage={user?.profileImage || ""}
      ></UserProfilePicture>
      <div className="flex flex-col gap-10 p-6">
        <div className="">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <ProfileForm user={user && user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default page;
