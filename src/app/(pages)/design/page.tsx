import img1 from "@/images/slider/img1.jpeg";
import img10 from "@/images/slider/img10.jpeg";
import img2 from "@/images/slider/img2.jpeg";
import img3 from "@/images/slider/img3.jpeg";
import img4 from "@/images/slider/img4.jpeg";
import img5 from "@/images/slider/img5.jpeg";
import img6 from "@/images/slider/img6.jpeg";
import img7 from "@/images/slider/img7.jpeg";
import img8 from "@/images/slider/img8.jpeg";
import img9 from "@/images/slider/img9.jpeg";
import Image from "next/image";

const data = [
  { id: 1, img: img1, alt: "Image 1 description" },
  { id: 2, img: img2, alt: "Image 2 description" },
  { id: 3, img: img3, alt: "Image 3 description" },
  { id: 4, img: img4, alt: "Image 4 description" },
  { id: 5, img: img5, alt: "Image 5 description" },
  { id: 6, img: img6, alt: "Image 6 description" },
  { id: 7, img: img7, alt: "Image 7 description" },
  { id: 8, img: img8, alt: "Image 8 description" },
  { id: 9, img: img9, alt: "Image 9 description" },
  { id: 10, img: img10, alt: "Image 10 description" },
];

export default function Design() {
  return (
    <div className="mx-10 my-20">
      <p className="mb-10 text-center text-3xl font-bold">
        All The Assets You Will Ever Need
      </p>

      <div className="columns-1 md:columns-3">
        {data.map((item) => (
          <div key={item.id} className="image-container py-2">
            <Image
              src={item.img}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
