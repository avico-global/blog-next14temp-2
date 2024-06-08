import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Banner from "@/components/containers/Banner";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import LatestBlogs from "@/components/containers/LatestBlogs";
import Head from "next/head";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";

import { Roboto } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Blog({
  logo,
  myblog,
  blog_list,
  project_id,
  imagePath,
  categories,
  domain,
}) {
  const router = useRouter();
  const { category } = router.query;
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        />
      </Head>

      <Navbar
        blog_list={blog_list}
        category={category}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
      />
      <Banner
        title={myblog?.value.title}
        tagline={myblog?.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`}
        author={myblog?.value.author}
        published_at={myblog?.value.published_at}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} className="py-5 justify-center" />
      <FullContainer>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-home gap-14 w-full">
            <div>
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <Rightbar />
          </div>
        </Container>
      </FullContainer>
      <LatestBlogs
        blogs={blog_list}
        imagePath={imagePath}
        project_id={project_id}
      />
      <Footer
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo?.file_name}`}
        project_id={project_id}
        imagePath={imagePath}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `http://${domain}/${myblog?.value.title
                      ?.toLowerCase()
                      .replaceAll(" ", "-")}`
                  : "",
              },
              headline: myblog?.value.title,
              description: myblog?.value.articleContent,
              datePublished: myblog?.value.published_at,
              author: myblog?.value.author,
              image: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
              publisher: "Site Manager",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "ItemList",
              url: `http://${domain}/${myblog.key}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog.key}`,
                  name: blog.title,
                },
              })),
            },
            {
              "@type": "WebPage",
              "@id": `http://${domain}/${myblog?.key}`,
              url: `http://${domain}/${myblog?.article}/${myblog?.key}`,
              name: myblog?.value?.meta_title,
              description: myblog?.value?.meta_description,
              publisher: {
                "@id": `http://${domain}`,
              },
              inLanguage: "en-US",
              isPartOf: { "@id": `http://${domain}` },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${myblog?.file_name}`,
              },
              datePublished: myblog?.value.published_at,
              dateModified: myblog?.value.published_at,
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ params, req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
  const blog = await callBackendApi({
    domain,
    query,
    type: params.blog,
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  const isValidBlog = blog_list.data[0].value.some(
    (item) => item.key === params.blog
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }
  const logo = await callBackendApi({ domain, query, type: "logo" });

  return {
    props: {
      domain,
      imagePath,
      project_id,
      logo: logo.data[0],
      myblog: blog.data[0],
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
    },
  };
}
