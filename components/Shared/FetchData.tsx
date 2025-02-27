import { getData } from "@/lib/utils";
import Client from "./client";

const FetchData = async () => {
  const categories = await getData(`/api/categories`);

  return (
    <>
      <Client categories={categories} />
    </>
  );
};

export default FetchData;
