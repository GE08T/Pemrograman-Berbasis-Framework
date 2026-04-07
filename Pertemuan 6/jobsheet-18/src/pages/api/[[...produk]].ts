import type { NextApiRequest, NextApiResponse } from "next";
import { retriveDataByID, retriveProducts } from "../../utils/db/servicefirebase";

type Data = {
  status: boolean;
  statusCode: number;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.query.produk![1]) {
    const data = await retriveDataByID("products", req.query.produk![1]);
    res.status(200).json({ status: true, statusCode: 200, data });
    return;
  } else {
    const data = await retriveProducts("products");
    res.status(200).json({ status: true, statusCode: 200, data });
  }
}
