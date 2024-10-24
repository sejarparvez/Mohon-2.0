"use client";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import Image from "next/image";

interface Props {
  id: string;
  image: string;
  name: string;
}

export default function Design() {
  const { isLoading, data, isError } = FetchAllDesign();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }
  return (
    <div className="mx-10 my-20">
      <p className="mb-10 text-center text-3xl font-bold">
        All The Assets You Will Ever Need
      </p>

      <div className="columns-1 md:columns-3">
        {data.map((item: Props) => (
          <div key={item.id} className="image-container py-2">
            <Image
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
