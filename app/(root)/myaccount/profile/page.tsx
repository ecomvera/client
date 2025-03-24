"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useToken } from "@/hooks/useToken";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/stores/user";
import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { IoFemaleOutline, IoMaleOutline, IoTransgenderOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const { token } = useToken();
  const { setUser } = useUserStore();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleSave = async () => {
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify({ name, email, phone, gender }),
    }).then((data) => data.json());
    if (res.ok) {
      console.log(res.data);
      const updatedUser: any = { ...user, name, email, phone, gender };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
        variant: "success",
      });
      return;
    }
    toast({
      title: "Error",
      description: "Failed to update profile",
      variant: "destructive",
    });
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setGender(user.gender);
    }
  }, [user]);
  return (
    <div>
      <h1
        className="flex md:hidden items-center gap-2 font-semibold mb-5 text-xl font-sans cursor-pointer"
        onClick={() => router.back()}
      >
        <GoArrowLeft className="w-7 h-7 md:hidden" /> My Account
      </h1>

      <div className="flex flex-col">
        <InputField name="name" label="Name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
        <InputField name="email" label="Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
        {/* <InputField name="phone" label="Phone" disabled defaultValue={phone} onChange={(e) => setPhone(e.target.value)} /> */}

        <div className="px-2">
          <span className="text-sm font-semibold mt-5">Gender</span>
          <div className="flex gap-3 flex-wrap">
            <div
              className={`border border-light-1 rounded-md px-3 flex items-center h-10 cursor-pointer ${
                gender === "Male" && "bg-primary text-background"
              }`}
              onClick={() => setGender("Male")}
            >
              <span className="flex gap-3 text-sm font-semibold">
                <IoMaleOutline className="w-5 h-5" /> <span>Male</span>
              </span>
            </div>
            <div
              className={`border border-light-1 rounded-md px-3 flex items-center h-10 cursor-pointer ${
                gender === "Female" && "bg-primary text-background"
              }`}
              onClick={() => setGender("Female")}
            >
              <span className="flex gap-3 text-sm font-semibold">
                <IoFemaleOutline className="w-5 h-5" /> <span>Female</span>
              </span>
            </div>
            <div
              className={`border border-light-1 rounded-md px-3 flex items-center h-10 cursor-pointer ${
                gender === "Other" && "bg-primary text-background"
              }`}
              onClick={() => setGender("Other")}
            >
              <span className="flex gap-3 text-sm font-semibold">
                <IoTransgenderOutline className="w-5 h-5" /> <span>Other</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Button
          className="w-full text-base"
          onClick={handleSave}
          disabled={
            (name === user?.name && email === user?.email && phone === user?.phone && gender === user?.gender) ||
            !name ||
            !email ||
            !phone ||
            !gender
          }
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Page;
