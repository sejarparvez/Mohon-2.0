"use client";

import {
  AdditionalCategory,
  AdditionalInfo,
  NewProductName,
  ProductCategory,
  ProductImage,
  ProductPrice,
  ProductStatus,
} from "@/components/form/formField/NewProductFormField";
import {
  NewProductFormSchema,
  NewProductFormSchemaType,
} from "@/components/form/formSchema/FormSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function NewDesign() {
  const [images, setImages] = useState<File[]>([]);
  const [warning, setWarning] = useState<string>("");

  const form = useForm<NewProductFormSchemaType>({
    resolver: zodResolver(NewProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "",
      category: "",
      subcategory: "",
      brand: "",
      price: undefined,
      discountPrice: undefined,
      discountPercent: undefined,
      additionalCategory: "",
      size: undefined,
      color: "",
      material: "",
    },
  });

  async function onSubmit(data: NewProductFormSchemaType) {
    if (images.length === 0) {
      setWarning("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    toast.loading("Please wait...");
    try {
      const response = await axios.post(
        "/api/products/single-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status !== 200) {
        toast.error("Failed to create product");
        setWarning("Failed to submit the form");
      } else {
        toast.dismiss();
        toast.success("Product successfully added");
        form.reset();
        setImages([]);
        setWarning("");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit the form");
      setWarning("An error occurred while submitting the form");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col sm:gap-4">
            <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Link href="/admin-dashboard/">
                    <Button
                      variant="outline"
                      type="button"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                  </Link>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Add Product
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        form.reset();
                        setImages([]);
                        setWarning("");
                      }}
                    >
                      Discard
                    </Button>
                    <Button size="sm" type="submit">
                      Save Product
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <NewProductName />
                    <ProductPrice />
                    <ProductCategory />
                    <AdditionalCategory />
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <ProductStatus />
                    <ProductImage
                      images={images}
                      setImages={setImages}
                      error={warning}
                    />
                    <AdditionalInfo />
                  </div>
                </div>
              </div>
            </main>
            <div className="mt-10 flex items-center justify-center gap-8 md:hidden">
              <Button
                variant="outline"
                type="button"
                size="sm"
                onClick={() => {
                  form.reset();
                  setImages([]);
                  setWarning("");
                }}
              >
                Discard
              </Button>
              <Button size="sm" type="submit">
                Save Product
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
