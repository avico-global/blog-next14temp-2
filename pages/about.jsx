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

const myFont = Montserrat({ subsets: ["cyrillic"] });
const font2 = Cormorant({ subsets: ["cyrillic"] });

export default function About({ logo, about_me }) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(about_me);

  console.log(about_me);
  return (
    <div className={myFont.className}>
      <Head>
        <title>Next 14 Template</title>
      </Head>
      <Navbar logo={logo} />
      <AboutBanner />
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
                className="markdown-content about_me"
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

export async function getStaticProps() {
  const _logo = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"logo"}`
  );
  const logo = await _logo.json();

  const _about_me = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_MANAGER
    }/api/public/industry_template_data/${
      process.env.NEXT_PUBLIC_INDUSTRY_ID
    }/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data/${"about_me"}`
  );
  const about_me = await _about_me.json();

  return {
    props: {
      logo: logo.data[0],
      about_me: about_me.data[0].value,
    },
  };
}
