import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import AboutBanner from "@/components/containers/AboutBanner";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import React from "react";
import { Montserrat } from "next/font/google";
import { Cormorant } from "next/font/google";
import { cn } from "@/lib/utils";
import Rightbar from "@/components/containers/Rightbar";
import Head from "next/head";
import MarkdownIt from "markdown-it";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";

const myFont = Montserrat({ subsets: ["cyrillic"] });
const font2 = Cormorant({ subsets: ["cyrillic"] });

export default function About({
  logo,
  about_me,
  imagePath,
  project_id,
  categories,
  blog_list,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me.value || "");

  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template</title>
      </Head>
      <Navbar
        blog_list={blog_list}
        categories={categories}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        project_id={project_id}
      />
      <AboutBanner
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${about_me.file_name}`}
      />
      <FullContainer>
        <Container className="py-16">
          <div className="grid grid-cols-about gap-16 w-full">
            <div className={font2.className}>
              <p
                className={cn(
                  "text-xs uppercase text-yellow-600",
                  myFont.className
                )}
              >
                LIFESTYLE BLOGGER
              </p>
              <div
                className="markdown-content about_me prose"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
            <Rightbar />
          </div>
        </Container>
      </FullContainer>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });

  return {
    props: {
      logo: logo.data[0] || null,
      about_me: about_me.data[0] || null,
      imagePath,
      blog_list: blog_list.data[0].value,
      project_id,
      categories: categories?.data[0]?.value || null,
    },
  };
}
