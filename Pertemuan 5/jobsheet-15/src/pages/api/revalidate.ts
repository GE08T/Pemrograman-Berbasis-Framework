// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

  if (req.query.data === "produk") {
    try {
      // Revalidate halaman produk static
      await res.revalidate('/produk/static');
      return res.json({ revalidated: true });
    } catch (err) {
      console.error("Error in API route: ", err);
      return res.status(500).send({ revalidated: false });
    }
  }

  return res.json({
    revalidated: false,
    message: "Invalid query parameter. Expected 'data=produk'.",
  });
}
