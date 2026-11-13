import React from "react";
import { socials } from "./PortfolioData";
import { ContentBlock, CustomLink } from "../components/desktop/WindowContent";

const socialsContent = (
  <>
    start &#8594; brainstorm for ideas 💭
    <br />
    start &#8594; contact to collab 💌
    <br />
    <br />
    {socials.map((item) => (
      <React.Fragment key={item.url}>
        <CustomLink href={item.url} text={item.name} />
        <div />
      </React.Fragment>
    ))}
  </>
);

const siteContent = (
  <>
    welcome to my safe space on the internet ᡣ • . • 𐭩 ♡
    <br />
    &#40; personal os 🌟 site assemblage 🌐 portfolio 📎 &#41;
    <br />
    <br />
    ૮꒰ ˶• ༝ •˶꒱ა ♡
    <br />
    <br />
    this website is{" "}
    <CustomLink
      text="open source"
      href="https://github.com/mellyeliu/mellyeliu.online"
    />
    , made with <CustomLink text="react" href="https://react.dev/" /> +{" "}
    <CustomLink text="vite" href="https://vite.dev/" />, and
    inspired by{" "}
    <CustomLink
      text="everything before me"
      href="https://www.are.na/vaiva-staugaityte/websites-that-look-like-operating-systems"
    />
  </>
);

const bioContent = (
  <>
    <div style={{ textAlign: "center" }}>
      ₊˚ . ⋅☁︎‧₊˚ ☾. ⋅
      <br />
    </div>
    <br />
    Melly (思源) is a software engineer and net artist. Interests include:
    messaging systems, creation myths, fandom as worldbuilding, recursive
    autofiction, video game as art form, personality tests, relational
    psychology, bed rotting [...] They maintain an
    enduring belief in the internet as identity play and softness as defiance.
    <br />
    <br />
    In the day they work on web infrastructure including JS frameworks, build
    systems, and <CustomLink text="StyleX" href="https://stylexjs.com/" />, and
    at night they work on web games. Before that they worked on{" "}
    <CustomLink text="Messenger" href="https://messenger.com" />, the website
    that first taught them how to talk to people. They still beta test it every
    day with their friends. The rest of their life is just content for their
    work
    {" ("}
    <CustomLink text="code" href="https://github.com/mellyeliu" />,{" "}
    <CustomLink text="text" href="https://reading.supply/@mellyeliu" />,{" "}
    <CustomLink
      text="visuals"
      href="https://mellyeliu.online/portfolio/design"
    />
    ,{" "}
    <CustomLink text="games" href="https://mellyeliu.online/portfolio/games" />
    {")"}.
  </>
);

const emojisContent = <>🎀💿🧸💫</>;

// Window contents, keyed by the `window` id of items in FileData.
const WindowData = {
  socials: <ContentBlock content={socialsContent} padding="175px 20px" />,
  bio: (
    <ContentBlock content={bioContent} padding="195px 25px" />
  ),
  site: (
    <ContentBlock
      content={siteContent}
      textAlign="center"
      padding="195px 50px"
    />
  ),
  pixels: (
    <ContentBlock content={emojisContent} textAlign="center" fontSize={48} />
  ),
};

export default WindowData;
