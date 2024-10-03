"use client";
import PaginationUi from "@/components/common/pagination/PaginationUi";
import DesignSkeleton from "@/components/common/skeleton/DesignSkeleton";
import { FetchAllDesign } from "@/components/fetch/design/FetchAllDesign";
import { convertDateString } from "@/components/helper/date/convertDateString";
import { DesignType } from "@/components/interface/DesignType";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";

function DesignMessage({ message }: { message: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

export default function Design({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { isLoading, data, isError } = FetchAllDesign(currentPage);

  console.log(data);

  return (
    <>
      <div className="mx-10 my-10">
        <h1 className="mb-10 text-center text-3xl font-bold">All Design</h1>
        {isLoading ? (
          <DesignSkeleton />
        ) : isError ? (
          <DesignMessage message="Something went wrong while fetching the designs." />
        ) : !data?.data || data.data.length === 0 ? (
          <DesignMessage message="No designs available." />
        ) : (
          <>
            <Table className="mt-4 hidden md:inline-table">
              <TableHeader className="w-full bg-secondary">
                <TableRow className="w-full border-t">
                  <TableHead className="text-left">Design</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="max-w-20 text-right">
                    Created At
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.map((item: DesignType) => (
                  <TableRow key={item.id} className="group">
                    <TableCell className="items-start align-top">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={100}
                        width={100}
                        className="w-20"
                      />
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="space-y-2">
                        <Link href="">{item.name}</Link>
                        <div className="flex items-center gap-4 text-sm group-hover:flex lg:hidden">
                          <Link
                            href={`/admin-dashboard/edit-product?id=${item.id}`}
                            className="text-primary"
                          >
                            Edit
                          </Link>
                          <Separator
                            orientation="vertical"
                            className="h-3 bg-black"
                          />
                          <Link href="" className="text-primary">
                            View
                          </Link>
                          <Separator
                            orientation="vertical"
                            className="h-3 bg-black"
                          />
                          <Dialog>
                            <DialogTrigger asChild>
                              <span className="cursor-pointer text-destructive">
                                Delete
                              </span>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this product?
                                  This Action can not be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    // onClick={() => handleDelete(item.id)}
                                  >
                                    Delete
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="align-top">{item.category}</TableCell>
                    <TableCell className="align-top">
                      {item.subcategory}
                    </TableCell>
                    <TableCell className="align-top">
                      {item.author.name}
                    </TableCell>

                    <TableCell className="text-right align-top leading-6">
                      {convertDateString(item.createdAt.toString())}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {/* Pagination */}
        {data?.meta && data.meta.totalPages > 1 && (
          <div className="mt-8 text-center">
            <PaginationUi totalPages={data.meta.totalPages} />
          </div>
        )}
      </div>
    </>
  );
}