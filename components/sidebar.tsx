import { cn } from "@/utils/cn";
import type { Item, MenuItem, PageItem } from "nextra/normalize-pages";
import type { Heading } from "nextra/types";
import { useMemo } from "react";

type FolderProps = {
  item: PageItem | MenuItem | Item;
  anchors: Heading[];
};

function Folder ({ item, anchors }: FolderProps) {
  return (
    <li>
      {item.title}
      {!!Array.isArray(item.children) && (
        <Menu
          className={cn(
            "relative before:absolute before:inset-y-1",
            'before:w-px before:bg-gray-200 before:content-[""] dark:before:bg-neutral-800',
            "ltr:pl-3 ltr:before:left-0 rtl:pr-3 rtl:before:right-0",
            "ltr:ml-3 rtl:mr-3"
          )}
          directories={item.children}
          base={item.route}
          anchors={anchors}
        />
      )}
    </li>
  );
}

type FileProps = { item: PageItem | Item; anchors: Heading[] };

function File ({ item, anchors }: FileProps) {
  return (
    <li>
      <a href={(item as PageItem).href || item.route}>{item.title}</a>
    </li>
  );
}

interface MenuProps {
  directories: PageItem[] | Item[];
  anchors: Heading[];
  base?: string;
  className?: string;
  onlyCurrentDocs?: boolean;
}

function Menu ({
  directories,
  anchors,
  className,
  onlyCurrentDocs,
  base
}: MenuProps) {
  return (
    <ul className={cn(className)}>
      {directories.map(item =>
        !onlyCurrentDocs || item.isUnderCurrentDocsTree ? (
          item.type === "menu" ||
          (item.children && (item.children.length || !item.withIndexPage)) ? (
            <Folder key={item.name} item={item} anchors={anchors} />
          ) : (
            <File key={item.name} item={item} anchors={anchors} />
          )
        ) : null
      )}
    </ul>
  );
}

export type SidebarProps = {
  docsDirectories: PageItem[];
  flatDirectories: Item[];
  fullDirectories: Item[];
  asPopover?: boolean;
  headings: Heading[];
  includePlaceholder: boolean;
};

export default function Sidebar ({
  docsDirectories,
  flatDirectories,
  fullDirectories,
  headings,
  includePlaceholder,
  asPopover
}: SidebarProps) {
  const anchors = useMemo(
    () => headings.filter(v => v.depth === 2),
    [headings]
  );

  console.log({ docsDirectories, flatDirectories, fullDirectories });

  return (
    <aside className="sidebar">
      <Menu directories={docsDirectories} anchors={anchors} onlyCurrentDocs />
    </aside>
  );
}
