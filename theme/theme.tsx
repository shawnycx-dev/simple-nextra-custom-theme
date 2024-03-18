import Head from "next/head";
import { MDXProvider, useMDXComponents } from "nextra/mdx";
import { NextraThemeLayoutProps } from "nextra/types";
import { useRouter } from "next/router";
import { DEFAULT_LOCALE } from "./constant";
import { useFSRoute } from "nextra/hooks";
import { normalizePages } from "nextra/normalize-pages";
import { useMemo } from "react";
import TOC from "@/components/toc";
import Sidebar from "@/components/sidebar";

export default function Layout ({
  children,
  ...nextraThemeProps
}: NextraThemeLayoutProps) {
  const { locale = DEFAULT_LOCALE, defaultLocale } = useRouter();
  const fsPath = useFSRoute();
  const { filePath, pageMap, frontMatter, headings, timestamp } =
    nextraThemeProps.pageOpts;

  const {
    activeType,
    activeIndex,
    activeThemeContext,
    activePath,
    topLevelNavbarItems,
    docsDirectories,
    flatDirectories,
    flatDocsDirectories,
    directories
  } = useMemo(
    () =>
      normalizePages({
        list: pageMap,
        locale,
        defaultLocale,
        route: fsPath
      }),
    [pageMap, locale, defaultLocale, fsPath]
  );

  const mdxComponents = useMDXComponents({
    h1: props => (
      <h1 className="text-4xl font-bold leading-normal capitalize" {...props} />
    ),
    h2: props => (
      <h2 className="text-3xl font-bold leading-normal capitalize" {...props} />
    ),
    h3: props => (
      <h3 className="text-2xl font-bold leading-normal capitalize" {...props} />
    ),
    p: props => <p className="text-base py-2" {...props} />
  });

  return (
    <>
      <Head>{nextraThemeProps?.themeConfig?.head()}</Head>
      <div className="content-container">
        {/* Sidenav */}
        <Sidebar
          docsDirectories={docsDirectories}
          flatDirectories={flatDirectories}
          fullDirectories={directories}
          headings={headings}
          asPopover={false}
          includePlaceholder={true}
        />
        {/* Main Content */}
        <MDXProvider components={mdxComponents}>
          <article className="main-content">{children}</article>
        </MDXProvider>
        {/* ToC */}
        <TOC filePath={filePath} headings={headings || []} />
      </div>
    </>
  );
}
