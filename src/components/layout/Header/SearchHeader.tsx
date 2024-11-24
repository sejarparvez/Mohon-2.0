"use client";

import { productCategories } from "@/components/data/ProductCategory";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { LucideSearch } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import User from "./User";

function SearchHeaderComponent({ fixed = false }: { fixed?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isScrolled, setIsScrolled] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const { scrollY } = useScroll();
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") || "",
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleFilterChange = useCallback(
    (value: string) => {
      setCategory(value);
      router.push(`/design?category=${value}&query=${searchQuery}&page=1`);
    },
    [router, searchQuery],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setSearchQuery(newQuery);
      // Update URL parameters and trigger fetchDesign with debouncing within it
      router.push(`/design?category=${category}&query=${newQuery}&page=1`);
    },
    [router, category],
  );

  const handleSearch = useCallback(() => {
    router.push(`/design?category=${category}&query=${searchQuery}&page=1`);
  }, [router, category, searchQuery]);

  // Disable animation on small screens
  useEffect(() => {
    const handleResize = () => {
      setDisableAnimation(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Initial check
    handleResize();
    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <div>
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="z-20 ml-48 hidden lg:block">
                <DesktopMenu fixed={fixed} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/company/pricing">
                <Button
                  className={`${fixed ? "border bg-transparent hover:bg-transparent" : "border border-primary bg-secondary text-primary hover:bg-secondary"}`}
                >
                  Pricing
                </Button>
              </Link>
              <User />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="left-0 top-0 z-10 border-b bg-background lg:sticky">
        <div className="container mx-auto py-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <motion.div
                className="mr-4"
                initial={{ y: -56 }}
                animate={
                  !disableAnimation
                    ? {
                        y: isScrolled ? 0 : -56,
                        transition: { type: "spring" },
                      }
                    : {}
                }
              >
                <Link
                  href="/"
                  className={`space-x-2 font-extrabold ${
                    fixed ? "text-white" : "text-black"
                  }`}
                >
                  <div className="flex items-end gap-2">
                    <span className="text-2xl">MHN</span>
                    <span className="hidden text-xl md:block">Graphics</span>
                  </div>
                </Link>
              </motion.div>

              <Select
                defaultValue={category}
                onValueChange={handleFilterChange}
              >
                <SelectTrigger
                  className={`bg-background ${isScrolled ? "md:ml-10" : "md:-ml-44"} -ml-20 min-w-32 transition-all duration-200`}
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Categories</SelectLabel>
                    <SelectItem value="all">All</SelectItem>
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
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Input
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button onClick={handleSearch} type="submit">
                <span>
                  <LucideSearch />
                </span>
                <span className="hidden md:block">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SearchHeader() {
  return (
    <Suspense
      fallback={
        <div>
          <Skeleton className="h-20" />
        </div>
      }
    >
      <SearchHeaderComponent />
    </Suspense>
  );
}