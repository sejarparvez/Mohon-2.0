import { AdditionalProductCategory } from "@/components/data/AdditionalProductCategory";
import { productCategories } from "@/components/data/ProductCategory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { toast } from "react-toastify";
import { NewProductFormSchemaType } from "../formSchema/FormSchema";

export const NewProductName: React.FC = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Add all the product details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Product Name</span>
                  <CgAsterisk color="red" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Provide a meaningful name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Product Brand</span>
                  <CgAsterisk color="red" />
                </FormLabel>
                <FormControl>
                  <Input placeholder="Provide the product brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex">
                  <span>Description</span>
                  <CgAsterisk color="red" />
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide your product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export const AdditionalInfo: React.FC = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Additional Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <FormField
            control={control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Size (inch)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Product Size" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Color</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Product color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Input placeholder="Product Material" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (gram)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Product Weight"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const calculateDiscountPercent = (
  oldPrice: number,
  newPrice: number | undefined,
) => {
  if (oldPrice <= 0 || newPrice === undefined || newPrice <= 0) {
    return 0;
  }
  return ((oldPrice - newPrice) / oldPrice) * 100;
};

export const ProductPrice: React.FC = () => {
  const { control, setValue } = useFormContext<NewProductFormSchemaType>();
  const oldPrice = useWatch({ control, name: "price" }) || 0;
  const newPrice = useWatch({ control, name: "discountPrice" }) || 0;

  useEffect(() => {
    const discountPercent = calculateDiscountPercent(oldPrice, newPrice);
    setValue("discountPercent", discountPercent);
  }, [oldPrice, newPrice, setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price & Stock</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-4 items-center gap-1 md:grid-cols-3 md:gap-4">
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem className="col-span-4 md:col-span-1">
                <FormLabel className="flex">
                  <span>Price</span>
                  <CgAsterisk color="red" />
                </FormLabel>
                <FormControl>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Product Price"
                    {...field}
                    value={field.value !== undefined ? field.value : ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : parseFloat(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel className="flex">Discount Price</FormLabel>
                <FormControl>
                  <Input
                    id="discount-price"
                    type="number"
                    placeholder="Discount price"
                    {...field}
                    value={field.value !== undefined ? field.value : ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : parseFloat(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="discountPercent"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                <FormLabel className="flex">Discount Percent</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    readOnly
                    {...field}
                    value={
                      field.value !== undefined ? field.value.toFixed(0) : ""
                    }
                    className="cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                <span>Stock</span>
                <CgAsterisk color="red" />
              </FormLabel>
              <FormControl>
                <Input
                  id="stockQuantity"
                  type="number"
                  placeholder="Stock quantity"
                  {...field}
                  value={field.value !== undefined ? field.value : ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? 0 : parseInt(e.target.value),
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export const ProductStatus: React.FC = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    <span>Product Status</span>
                    <CgAsterisk color="red" />
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Product Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Publish</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductCategory = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();

  const selectedCategory = useWatch({
    control: control,
    name: "category",
  });

  const subcategories =
    productCategories.find((category) => category.value === selectedCategory)
      ?.subcategories || [];
  return (
    <Card x-chunk="dashboard-07-chunk-2">
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-3">
            <div>
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">
                      <span>Product Category</span>
                      <CgAsterisk color="red" />
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value
                              .toLowerCase()
                              .replace(/\s+/g, "_")}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid gap-3">
            <FormField
              control={control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex">
                    <span>Sub Category</span>
                    <CgAsterisk color="red" />
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Subcategory</SelectLabel>
                          {subcategories.map((subcategory) => (
                            <SelectItem
                              key={subcategory.value}
                              value={subcategory.value
                                .toLowerCase()
                                .replace(/\s+/g, "_")}
                            >
                              {subcategory.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const AdditionalCategory = () => {
  const { control } = useFormContext<NewProductFormSchemaType>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Category</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="additionalCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {AdditionalProductCategory.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value.toLowerCase().replace(/\s+/g, "_")}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

interface ProductImageProps {
  images: File[];
  error: string | undefined;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_IMAGE_SIZE_KB = 300;

export const ProductImage: React.FC<ProductImageProps> = ({
  images,
  setImages,
  error,
}) => {
  const [imageError, setImageError] = useState("");

  const handleFile = (file: File) => {
    if (file.size > MAX_IMAGE_SIZE_KB * 1024) {
      setImageError("File size exceeds the maximum allowed size");
      toast.error(
        `Image size exceeds the maximum limit of ${MAX_IMAGE_SIZE_KB} KB`,
      );
    } else {
      setImages([...images, file]);
      setImageError("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => handleFile(file));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex">
          <span>Product Image</span>
          <CgAsterisk color="red" />
        </CardTitle>
        <CardDescription>
          Upload product images. Maximum file size is {MAX_IMAGE_SIZE_KB} KB.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {images.length > 0 ? (
            <div className="relative w-full">
              <Image
                alt="Product image"
                className="aspect-square h-60 w-full rounded-md object-cover"
                height={300}
                src={URL.createObjectURL(images[0])}
                width={300}
              />
              <button
                onClick={() => removeImage(0)}
                className="absolute right-1 top-1 z-10 flex items-center justify-center rounded-full bg-red-600 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Image
              alt="Product image"
              className="aspect-square h-40 w-full rounded-md object-cover"
              height={300}
              src="/placeholder.svg"
              width={300}
            />
          )}
          <div className="grid grid-cols-3 gap-2">
            {images.slice(1).map((file, index) => (
              <div key={index} className="relative aspect-square w-full">
                <Image
                  alt={`Product image ${index + 1}`}
                  className="rounded-md object-cover"
                  height={300}
                  src={URL.createObjectURL(file)}
                  width={300}
                />
                <button
                  onClick={() => removeImage(index + 1)}
                  className="absolute right-1 top-1 z-10 flex items-center justify-center rounded-full bg-red-600 p-1 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {images.length < 4 && (
              <label className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-dashed bg-secondary">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="sr-only">Upload</span>{" "}
              </label>
            )}
          </div>
        </div>
        {imageError && (
          <p className="mt-2 text-sm text-red-600">{imageError}</p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
};
