'use client';

import React from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AdminSidebar } from './admin-sidebar';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider className="bg-green-500 container mx-auto">
      <div className="sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <SidebarInset>
        <header className="sticky top-0 z-10 bg-background flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-0">
          <div className="flex items-start gap-2 ">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 pl-4 py-5">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
