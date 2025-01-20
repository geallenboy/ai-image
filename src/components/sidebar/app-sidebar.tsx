import React from "react";
import { Sparkles } from "lucide-react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import Title from "./title";
import Link from "next/link";

export const AppSidebar = async ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const supbase = await createClient();
  const {
    data: { user },
  } = await supbase.auth.getUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/dashboard"}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <Title />
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.user_metadata.fullName,
            email: user?.user_metadata.email,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
