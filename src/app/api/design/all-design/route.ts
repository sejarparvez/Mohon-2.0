import { Prisma } from "@/components/helper/prisma/Prisma";
import { DesignStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryParams = new URLSearchParams(url.search);

    const page = queryParams.get("page")
      ? parseInt(queryParams.get("page")!, 10)
      : 1;
    const category = queryParams.get("category") || "all";
    const searchQuery = queryParams.get("searchQuery") || "";

    const limit = 30;
    const skip = (page - 1) * limit;

    let whereClause: {
      category?: string;
      status?: DesignStatus;
      name?: {
        contains: string;
        mode: "insensitive";
      };
    } = {};

    whereClause.status = "PUBLISHED";

    if (category !== "all") {
      whereClause.category = category;
    }
    if (searchQuery) {
      whereClause.name = {
        contains: searchQuery,
        mode: "insensitive",
      };
    }

    // Fetch designs with pagination and filtering
    const response = await Prisma.design.findMany({
      where: whereClause, // Add the where clause here
      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // Get the total count of designs for pagination metadata with filtering
    const totalCount = await Prisma.design.count({
      where: whereClause, // Add the where clause here
    });

    const result = {
      data: response,
      meta: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        itemsPerPage: limit,
      },
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
