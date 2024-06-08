import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Head from "next/head";
import React from "react";
import { Montserrat } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Map from "@/components/containers/Map";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  getProjectId,
} from "@/lib/myFun";

const myFont = Montserrat({ subsets: ["cyrillic"] });

export default function Contact({
  logo,
  project_id,
  imagePath,
  blog_list,
  categories,
}) {
  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template</title>
      </Head>
      <Navbar
        blog_list={blog_list}
        logo={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${logo.file_name}`}
        project_id={project_id}
        categories={categories}
      />
      <FullContainer>
        <Container className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-contact gap-14 w-full">
            <div>
              <Textarea label="Message" />
              <div className="grid grid-cols-2 gap-10 mt-3">
                <Input label="Name" placeholder="Your Name" />
                <Input label="Email" placeholder="Your Email" />
              </div>
              <Button className="mt-6">Send Message</Button>
            </div>
            <div className="flex flex-col items-center text-center">
              <Map location="united states" />
              <div className="flex flex-col items-center text-center text-gray-500 text-xs gap-3">
                <p className="text-xl mt-3 font-bold text-black">
                  London Studio
                </p>
                <p>zoya@qodeinteractive.com</p>
                <p>Westminster, London, UK</p>
                <p>(00)207-123-1234</p>
              </div>
            </div>
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
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });

  return {
    props: {
      logo: logo.data[0] || null,
      imagePath,
      project_id,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
    },
  };
}
