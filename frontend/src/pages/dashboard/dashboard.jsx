import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {

  const location = useLocation();
  const breadcrumb = location.pathname
    .replace("/home", "")
    .split("/").
    filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/home">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumb.map((path, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {path.charAt(0).toUpperCase() + path.slice(1)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href="#">
                            {path}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="relative flex flex-1 flex-col">          
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
