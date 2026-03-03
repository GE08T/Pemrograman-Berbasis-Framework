import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  id: string;
  nama: string;
  harga: number;
  ukuran: string;
  warna: string;
};

type Data = {
  status: boolean;
  statusCode: number;
  data: Product[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data: Product[] = [
    {
      id: "1",
      nama: "Kaos Polos",
      harga: 10000,
      ukuran: "L",
      warna: "merah",
    },
    {
      id: "2",
      nama: "Kaos Berlengan Panjang",
      harga: 15000,
      ukuran: "M",
      warna: "biru",
    },
  ];

  res.status(200).json({ status: true, statusCode: 200, data });
}
