import type { NextApiRequest, NextApiResponse } from "next";
import { retriveProducts } from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await retriveProducts("products");
  res.status(200).json({ status: true, statusCode: 200, data });
}
