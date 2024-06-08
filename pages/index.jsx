import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Banner from "@/components/containers/Banner";
import MostPopular from "@/components/containers/MostPopular";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Blog from "@/components/common/Blog";
import Rightbar from "@/components/containers/Rightbar";
import Head from "next/head";
import LatestBlogs from "@/components/containers/LatestBlogs";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";

import { Roboto } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Home({
  logo,
  banner,
  blog_list,
  imagePath,
  project_id,
  categories,
  domain,
  meta,
}) {
  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
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
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        project_id={project_id}
      />
      <Banner
        badge={banner.value.badge}
        title={banner.value.title}
        tagline={banner.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${banner?.file_name}`}
      />

      <FullContainer>
        <Container className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-home gap-12 lg:gap-14 w-full">
            <div className="flex flex-col gap-20">
              {blog_list?.map((item, index) => (
                <Blog
                  key={index}
                  title={item.title}
                  author={item.author}
                  date={item.published_at}
                  tagline={item.tagline}
                  description={item.articleContent}
                  image={
                    item.image
                      ? `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${item.image}`
                      : "/no-image.png"
                  }
                  project_id={project_id}
                  href={
                    project_id
                      ? `/${item?.article_category?.name}/${item.key}?${project_id}`
                      : `/${item?.article_category?.name}/${item.key}`
                  }
                />
              ))}
            </div>
            <Rightbar />
          </div>
        </Container>
      </FullContainer>
      <MostPopular
        blog_list={blog_list}
        imagePath={imagePath}
        project_id={project_id}
      />
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
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog?.article_category?.name}/${blog.key}`,
                  name: blog.title,
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);

  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const banner = await callBackendApi({ domain, query, type: "banner" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });

  return {
    props: {
      domain,
      imagePath,
      project_id,
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
    },
  };
}
