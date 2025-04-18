'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn, isActivePath } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    href: string;
    icon?: React.ReactNode;
    items?: {
      title: string;
      href: string;
    }[];
  }[];
}) {
  const pathName = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            {item.items?.length && item.items.length > 0 ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.href}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : (
              <Link
                href={item.href}
                passHref
                className={cn({
                  '!text-primary': isActivePath(
                    item.href,
                    pathName,
                    false,
                    '/dashboard'
                  ),
                })}
              >
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip={item.title}
                >
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            )}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
