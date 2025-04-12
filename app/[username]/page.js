import PaymentPage from "@/components/PaymentPage";
import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

const page = async ({ params }) => {
  await connectDB()
  // If the username is not present in the database, show a 404 page.
  const checkUser = async () => {
    let u = await User.findOne({ username: params.username });
    if (!u) {
      return notFound();
    }
  };
  await checkUser();

  const { username } = await params;  // No need for await here
  return (
    <>   
      <PaymentPage username={username} />
    </>
  );
};

export default page;

// Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get Me a Chai`
  };
}
