import { IAddress } from "@/types";
import { create } from "zustand";

const addressData: IAddress = {
  name: "",
  phone: "",
  line1: "",
  line2: "",
  landmark: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};

interface IAddressStore {
  addressData: IAddress;
  setAddressData: (addressData: IAddress) => void;
}

export const useAddressStore = create<IAddressStore>((set) => ({
  addressData: addressData,
  setAddressData: (addressData: IAddress) => set({ addressData: addressData }),
}));
