import React from "react";
import PortfolioData from "./PortfolioData";
import { useMediaQuery } from "react-responsive";

function CustomLink({ text, href, color = "#bf75bf" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "underline",
        pointerEvents: "auto",
        color,
      }}
      onMouseOver={(e) => (e.currentTarget.style.letterSpacing = "1px")}
      onMouseOut={(e) => (e.currentTarget.style.letterSpacing = "0px")}
    >
      {text}
    </a>
  );
}

function ContentBlock({
  content,
  textAlign = "left",
  padding = "165px 20px",
  fontSize = 22,
}) {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        color: "#222",
        fontSize: isMobile ? fontSize * 0.9 : fontSize,
        textAlign,
        lineHeight: isMobile ? "1.05" : "1.15",
        padding: isMobile ? "140px 20px" : padding,
        letterSpacing: -0.1,
        fontFamily: "Helvetica",
        // fontWeight: 500,
        zIndex: 1000000,
        pointerEvents: "none",
      }}
    >
      {content}
    </div>
  );
}

const socialsContent = (
  <>
    start &#8594; brainstorm for ideas 💭
    <br />
    start &#8594; contact to collab 💌
    <br />
    <br />
    {PortfolioData.main.social.map((item, index) => (
      <React.Fragment key={index}>
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
    &#40; web portrait 🌟 site assemblage 🌐 portfolio 📎 &#41;
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
    , made with <CustomLink text="react" href="https://react.dev/" />, and
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
      ₊˚ . ⋅☁︎‧₊˚ ☾. ⋅<br />
    </div>
    <br />
    Melissa is a software engineer and net artist. Interests include: messaging
    systems, creation myths, fandom as worldbuilding, video game as art form,
    literary tropes, pseudoscientific personality tests, creative intimacy,
    relational psychology, bed rotting [...] They maintain an enduring belief in
    the internet and its potential for connection and identity play.
    <br />
    <br />
    In the day they work on design systems,{" "}
    <CustomLink
      text="css-in-js tooling"
      href="https://github.com/facebook/stylex"
    />
    , and{" "}
    <CustomLink
      text="cross-platform"
      href="https://github.com/facebook/react-strict-dom"
    />{" "}
    components in React, the library where they fell in love with coding, and at
    night they use it on random side quests. Before that they worked on the{" "}
    <CustomLink text="website" href="https://messenger.com" /> that first taught
    them how to talk to people. She still beta tests it every day with her
    friends. The rest of her life is just content fodder for her work.
  </>
);

const emojisContent = <>🎀💿🧸💫</>;

const WindowData = {
  "( Socials )": <ContentBlock content={socialsContent} padding="175px 20px" />,
  "૮꒰ ˶• ༝ •˶꒱ა ♡": (
    <ContentBlock content={bioContent} padding="195px 25px" />
  ),
  "( 🌐🤍🎀🫧 )": (
    <ContentBlock
      content={siteContent}
      textAlign="center"
      padding="195px 50px"
    />
  ),
  "( Girlhood )": (
    <ContentBlock content={emojisContent} textAlign="center" fontSize={48} />
  ),
};

export default WindowData;
