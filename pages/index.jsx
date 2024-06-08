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
}) {
  console.log("blog_list", blog_list);
  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template by Faaiz</title>
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
                />
              ))}
            </div>
            <Rightbar />
          </div>
        </Container>
      </FullContainer>
      <MostPopular />
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
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const imagePath = await getImagePath({ domain, query });
  const project_id = getProjectId(query);
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
      logo: logo.data[0],
      banner: banner.data[0],
      blog_list: blog_list.data[0].value,
      imagePath,
      project_id,
      categories: categories?.data[0]?.value || null,
    },
  };
}
