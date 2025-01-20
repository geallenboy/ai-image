"use client";

import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import LogoutBtn from "@/components/login/logout-btn";
import { useTranslations } from "next-intl";

export const NavUser = ({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) => {
  const { isMobile } = useSidebar();
  const sidebarT = useTranslations("sidebar");
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback className="rounded-lg font-medium bg-primary text-primary-foreground text-xs">
                  {user?.name &&
                    user?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarFallback className="rounded-lg font-medium bg-primary text-primary-foreground text-xs">
                    {user?.name &&
                      user?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link
                href={"/account-settings"}
                className="w-full cursor-pointer"
              >
                <DropdownMenuItem>
                  <BadgeCheck />
                  {sidebarT("settings")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <Link href={"/billing"} className="w-full cursor-pointer">
                <DropdownMenuItem>
                  <CreditCard />
                  {sidebarT("billing")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="size-4 text-destructive" />
              <LogoutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
