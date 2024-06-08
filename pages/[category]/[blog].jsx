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
}) {
  const router = useRouter();
  const { category } = router.query;
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);

  return (
    <div className={myFont.className}>
      <Head>
        <title>{myblog?.value.title} | Next 14 Template</title>
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
      <FullContainer>
        <Container className="py-16">
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
      <Footer />
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
      logo: logo.data[0],
      myblog: blog.data[0],
      blog_list: blog_list.data[0].value,
      imagePath,
      project_id,
      categories: categories?.data[0]?.value || null,
    },
  };
}
