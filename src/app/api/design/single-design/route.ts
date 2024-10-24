import { Prisma } from "@/components/helper/prisma/Prisma";
import storage from "@/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Helper function to extract string value from formData
function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

// Function to upload image to Firebase and return download URL
async function uploadImage(image: Blob, path: string): Promise<string> {
  const filename = `${Date.now()}_${(image as File).name.replaceAll(" ", "_")}`;
  const storageRef = ref(storage, `${path}${filename}`);
  const buffer = Buffer.from(await image.arrayBuffer());
  await uploadBytes(storageRef, buffer);
  return getDownloadURL(storageRef);
}

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret });
    const authorId = token?.sub;

    if (!token || !authorId) {
      return new NextResponse("User not logged in or authorId missing", {
        status: 401,
      });
    }

    const formData = await req.formData();

    const name = getStringValue(formData, "name");
    const description = getStringValue(formData, "description");
    const category = getStringValue(formData, "category");
    const subcategory = getStringValue(formData, "subcategory");
    const tags =
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim()) || [];

    // Handle image file if present
    const imageFile = formData.get("image") as Blob;
    let imageUrl = "";
    if (imageFile) {
      // Upload the image and get the URL
      imageUrl = await uploadImage(imageFile, "designs/");
    }

    // Insert data into the database using Prisma
    const design = await Prisma.design.create({
      data: {
        name,
        description,
        category,
        subcategory,
        tags,
        image: imageUrl, // Store the image URL in the database
        authorId,
      },
    });

    // Return a JSON response
    return NextResponse.json({
      message: "Design created successfully",
      design,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
