import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongoose";
import Customer from "@/models/Customer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const customer = new Customer(req.body);
      await customer.save();
      res.status(201).json({ message: "Review created" });
    } catch (error) {
      // eslint-disable-next-line no-unused-vars
      res.status(400).json({ error: "Failed to create review" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
