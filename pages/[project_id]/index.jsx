import Head from "next/head";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Banner from "@/components/containers/Banner";
import MostPopular from "@/components/containers/MostPopular";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Blog from "@/components/common/Blog";
import { blogs } from "@/components/blogs";
import Rightbar from "@/components/containers/Rightbar";
import { Montserrat } from "next/font/google";
import LatestBlogs from "@/components/containers/LatestBlogs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Home({ logo, banner, blog_list }) {
  const router = useRouter();
  const { project_id } = router.query;
  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template</title>
      </Head>
      <Navbar
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/project_images/${project_id}/${logo.file_name}`}
      />
      <Banner
        badge={banner.value.badge}
        title={banner.value.title}
        tagline={banner.value.tagline}
        image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/project_images/${project_id}/${banner?.file_name}`}
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
                  project_id={project_id}
                  description={item.articleContent}
                  image={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/project_images/${project_id}/${item.image}`}
                />
              ))}
            </div>
            <Rightbar />
          </div>
        </Container>
      </FullContainer>
      <MostPopular />
      <LatestBlogs blogs={blog_list} project_id={project_id} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const _logo = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data/${
      params.project_id
    }/data/${"logo"}`
  );
  const logo = await _logo.json();

  const _banner = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data/${
      params.project_id
    }/data/${"banner"}`
  );
  const banner = await _banner.json();

  const _blog_list = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data/${
      params.project_id
    }/data/${"blog_list"}`
  );
  const blog_list = await _blog_list.json();

  return {
    props: {
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
    },
  };
}
