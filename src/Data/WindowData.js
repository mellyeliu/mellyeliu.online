import React from "react";
import PortfolioData from "./PortfolioData";
import * as stylex from "@stylexjs/stylex";

function CustomLink({ text, href, color = "#B666BA" }) {
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

function ContentBlock(props) {
  const content = props.content;
  const textAlign = props.textAlign || "left";
  const padding = props.padding || "165px 20px";
  const fontSize = props.fontSize || 22;

  const styles = stylex.create({
    contentBlock: {
      whiteSpace: "pre-wrap",
      color: "#222",
      fontSize: {
        default: 22,
        "@media (max-width: 767px)": 19.8,
      },
      textAlign: "left",
      lineHeight: {
        default: "1.15",
        "@media (max-width: 767px)": "1.05",
      },
      padding: {
        default: "165px 20px",
        "@media (max-width: 767px)": "140px 20px",
      },
      letterSpacing: -0.1,
      fontFamily: "Helvetica",
      zIndex: 1000000,
      pointerEvents: "none",
    },
  });

  // Dynamic styles that depend on props
  const dynamicStyles = {
    fontSize: fontSize,
    textAlign: textAlign,
    padding: padding,
  };

  return (
    <div {...stylex.props(styles.contentBlock)} style={dynamicStyles}>
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
      ₊˚ . ⋅☁︎‧₊˚ ☾. ⋅
      <br />
    </div>
    <br />
    Melissa (思源) is a software engineer and net artist. Interests include:
    messaging systems, creation myths, fandom as worldbuilding, recursive
    autofiction, video game as art form, literary tropes, pseudoscientific
    personality tests, relational psychology, bed rotting [...] They maintain an
    enduring belief in the internet as identity play and softness as defiance.
    <br />
    <br />
    In the day they work on web tooling like{" "}
    <CustomLink text="StyleX" href="https://github.com/facebook/stylex" />, a
    css-in-js library, and at night they work on web games. Before that they
    worked on <CustomLink text="Messenger" href="https://messenger.com" />, the
    website that first taught them how to talk to people. They still beta test
    it every day with their friends. The rest of their life is just content for
    their work
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
  "( Pixels )": (
    <ContentBlock content={emojisContent} textAlign="center" fontSize={48} />
  ),
};

export default WindowData;
