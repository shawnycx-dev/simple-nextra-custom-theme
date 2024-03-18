import { useRouter } from 'next/router'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const nextraConfig: DocsThemeConfig = {
  docsRepositoryBase: 'https://google.com',
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter()
    const { frontMatter, ...config } = useConfig()
    const url =
      'https://my-app.com' +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <title>{frontMatter.title || 'Nextra'}</title>
        <meta property='og:url' content={url} />
        <meta property='og:title' content={frontMatter.title || 'Nextra'} />
        <meta
          property='og:description'
          content={frontMatter.description || 'The next site builder'}
        />
      </>
    )
  }
}

export default nextraConfig
