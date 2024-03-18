import { cn } from "@/utils/cn";
import { Heading } from "nextra/types";
import { useMemo } from "react";

export type TOCProps = {
  headings: Heading[];
  filePath: string;
};

export default function TOC ({ headings, filePath }: TOCProps) {
  const items = useMemo(
    () => headings.filter(heading => heading.depth > 1),
    [headings]
  );

  return (
    <nav className="toc my-2" aria-label="table of contents">
      <p className="mb-4 font-semibold tracking-tight capitalize">
        On this page
      </p>
      <ul>
        {items.map(item => (
          <li className="my-2 scroll-my-6 scroll-py-6" id={item.id}>
            <a
              className={cn(
                "inline-block",
                "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300",
                "contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 w-full break-words",
                {
                  2: "font-semibold",
                  3: "ltr:pl-4 rtl:pr-4",
                  4: "ltr:pl-8 rtl:pr-8",
                  5: "ltr:pl-12 rtl:pr-12",
                  6: "ltr:pl-16 rtl:pr-16"
                }[item.depth as Exclude<typeof item.depth, 1>]
              )}
              href={`#${item.id}`}
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
