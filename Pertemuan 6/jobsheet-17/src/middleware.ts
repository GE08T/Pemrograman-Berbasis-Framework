import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

const baseMiddleware: NextMiddleware = async (
    _req: NextRequest,
    _next: NextFetchEvent,
) => {
    return NextResponse.next();
};

const requireAuthPaths: string[] = [
    "/profile",
    "/produk",
    "/about",
    "/admin"
];

export default withAuth(baseMiddleware, requireAuthPaths);