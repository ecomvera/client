"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

function HeaderNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base">Men</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-full max-w-[550px] gap-10 p-5 px-8">
              <div>
                <h3 className="text-base font-semibold">Topwear</h3>
                <ul role="list" className="mt-3 space-y-1">
                  {components.map((component) => (
                    <Link href={component.href} key={component.title}>
                      <div className="text-light-3 my-2 text-sm">
                        <p className="text-nowrap">{component.title}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Bottomwear</h3>
                <ul role="list" className="mt-3 space-y-1">
                  {components.map((component) => (
                    <Link href={component.href} key={component.title}>
                      <div className="text-light-3 my-2 text-sm">
                        <p className="text-nowrap">{component.title}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Topseller</h3>
                <ul role="list" className="mt-3 space-y-1">
                  {components.map((component) => (
                    <Link href={component.href} key={component.title}>
                      <div className="text-light-3 my-2 text-sm">
                        <p className="text-nowrap">{component.title}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Women</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-full max-w-[550px] gap-10 p-5 px-8">
              <div>
                <h3 className="text-base font-semibold">Topwear</h3>
                <ul role="list" className="mt-3 space-y-1">
                  {components.map((component) => (
                    <Link href={component.href} key={component.title}>
                      <div className="text-light-3 my-2 text-sm">
                        <p className="text-nowrap">{component.title}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Bottomwear</h3>
                <ul role="list" className="mt-3 space-y-1">
                  {components.map((component) => (
                    <Link href={component.href} key={component.title}>
                      <div className="text-light-3 my-2 text-sm">
                        <p className="text-nowrap">{component.title}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Topseller</h3>
                <ul role="list" className="mt-3 space-y-1">
                  {components.map((component) => (
                    <Link href={component.href} key={component.title}>
                      <div className="text-light-3 my-2 text-sm">
                        <p className="text-nowrap">{component.title}</p>
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default HeaderNavigation;
