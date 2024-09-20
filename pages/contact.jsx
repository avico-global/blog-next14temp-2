import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Head from "next/head";
import React from "react";
import Map from "@/components/containers/Map";
import {
  callBackendApi,
  getDomain,
  getImagePath,
} from "@/lib/myFun";

import { Roboto } from "next/font/google";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Contact({
  logo,
  project_id,
  imagePath,
  blog_list,
  about_me,
  meta,
  domain,
  layout,
  favicon,
  categories,
  copyright,
  contact_details,
}) {
  const page = layout?.find((item) => item.page === "contact");

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://www.${domain}`} />
        <link rel="publisher" href={`http://www.${domain}`} />
        <link rel="canonical" href={`http://www.${domain}/contact`} />
        {/* <meta name="robots" content="noindex" /> */}
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;
            switch (item.section) {
              case "navbar":
                return (
                  <Navbar
                    blog_list={blog_list}
                    logo={`${imagePath}/${logo.file_name}`}
                    project_id={project_id}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );

              case "map":
                return (
                  <FullContainer>
                    <Container className="mt-16">
                      <Map location="united states" />
                    </Container>
                  </FullContainer>
                );
              case "contact info":
                return (
                  <FullContainer key={index}>
                    <Container className="mt-10">
                      <div className="flex flex-col items-center text-center text-gray-500 text-xs gap-3">
                        <h1 className="text-xl mt-3 font-bold text-black">
                          {contact_details?.name}
                        </h1>
                        <h2 className=" ">{contact_details?.email}</h2>
                        <p>{contact_details?.address}</p>
                        <p>{contact_details?.phone}</p>
                      </div>
                    </Container>
                  </FullContainer>
                );
              case "footer":
                return (
                  <Footer
                  key={index}
                  blog_list={blog_list}
                  categories={categories}
                  logo={`${imagePath}/${logo?.file_name}`}
                  project_id={project_id}
                  imagePath={imagePath}
                  about_me={about_me}
                  copyright={copyright}
                  contact_details={contact_details}
                />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, query, type: "logo" });

  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_contact" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  const project_id = logo?.data[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);

  const about_me = await callBackendApi({ domain, type: "about_me" });


  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      about_me: about_me?.data[0] || null,
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0].value,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
