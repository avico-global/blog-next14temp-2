import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Banner from "@/components/containers/Banner";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import { Montserrat } from "next/font/google";
import MarkdownIt from "markdown-it";
import Head from "next/head";
import LatestBlogs from "@/components/containers/LatestBlogs";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Blog({ logo, myblog, blog_list }) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);

  return (
    <div className={myFont.className}>
      <Head>
        <title>{myblog?.value.title} | Next 14 Template</title>
      </Head>
      <Navbar logo={logo} />
      <Banner
        title={myblog?.value.title}
        tagline={myblog?.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/${myblog?.file_name}`}
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
      <LatestBlogs blogs={blog_list} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const _blog = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${params.blog.replaceAll(
      "-",
      "_"
    )}`
  );
  const blog = await _blog.json();

  const _blog_list = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"blog_list"}`
  );
  const blog_list = await _blog_list.json();

  const isValidBlog = blog_list.data[0].value.some(
    (item) => item.title.toLowerCase().replaceAll(" ", "-") === params.blog
  );

  if (!isValidBlog) {
    return {
      notFound: true,
    };
  }

  const _logo = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"logo"}`
  );
  const logo = await _logo.json();

  return {
    props: {
      logo: logo.data[0],
      myblog: blog.data[0],
      blog_list: blog_list.data[0].value,
    },
  };
}
