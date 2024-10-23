"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home breadcrumb item */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            {pathArray.map((path, index) => {
              const href = `/${pathArray.slice(0, index + 1).join("/")}`;
              const isLast = index === pathArray.length - 1;

              return (
                <BreadcrumbItem key={index}>
                  {/* Add separator after home */}
                  {index > 0 && <BreadcrumbSeparator />}

                  {/* If it's the last breadcrumb, render as plain text */}
                  {!isLast ? (
                    <BreadcrumbLink href={href}>
                      {decodeURIComponent(path.replace("-", " "))}
                    </BreadcrumbLink>
                  ) : (
                    <span>{decodeURIComponent(path.replace("-", " "))}</span>
                  )}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
