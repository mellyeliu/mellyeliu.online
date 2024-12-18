import React from "react";
import PortfolioData from "./PortfolioData";

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
  padding = "150px 20px",
  fontSize = "20px",
}) {
  return (
    <div
      style={{
        whiteSpace: "pre-wrap",
        color: "#222",
        fontSize,
        textAlign,
        lineHeight: "1.1",
        padding,
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

const FileData = {
  games: [
    {
      hoverString: "www.neopets.com",
      src: "images/icons/neopetsicon.png",
      url: "https://www.neopets.com/",
      scale: 0.52,
      x: 20,
      y: 30,
      iconText: "neopets.png",
    },
    {
      hoverString: "https://jstris.jezevec10.com/",
      url: "https://jstris.jezevec10.com/u/magicunicorn",
      src: "images/icons/tetris2.png",
      scale: 0.52,
      x: 20,
      y: 20,
      iconText: "tetris.png",
    },
    {
      hoverString: "The Company of Myself",
      src: "images/icons/com.png",
      url: "https://www.newgrounds.com/portal/view/518729",
      scale: 0.52,
      x: 40,
      y: 30,
      iconText: "company of myself.png",
    },
    {
      hoverString: "You Find Yourself In A Room",
      src: "images/icons/YFYIAR.png",
      url: "https://www.newgrounds.com/portal/view/556644",
      scale: 0.52,
      x: 54,
      y: 46,
      iconText: "yfyiar.png",
    },
    {
      hoverString: "Town of Salem",
      src: "images/icons/salem.png",
      url: "https://blankmediagames.com/",
      scale: 0.52,
      x: 75,
      y: 60,
      iconText: "salem.png",
    },
    {
      hoverString: "( Kingdom of Loathing )",
      src: "images/icons/kol.png",
      url: "https://www.kingdomofloathing.com/",
      scale: 0.52,
      x: 31,
      y: 25,
      iconText: "koloathing.png",
    },
    {
      hoverString: "( Spider and Web )",
      src: "images/icons/spiderweb.png",
      url: "https://eblong.com/zarf/zweb/tangle/",
      scale: 0.52,
      x: 18,
      y: 9,
      iconText: "spider and web.png",
    },
    {
      hoverString: "Club Penguin",
      src: "images/icons/cp.png",
      url: "https://www.cplegacy.com/",
      scale: 0.52,
      x: 50,
      y: 40,
      iconText: "club penguin.png",
    },
    {
      hoverString: "Shift",
      src: "images/icons/shift.png",
      url: "https://armorgames.com/play/751/shift",
      scale: 0.52,
      x: 7,
      y: 13,
      iconText: "shift.png",
    },
    {
      hoverString: "Fantage",
      src: "images/icons/fantage.png",
      url: "https://en.wikipedia.org/wiki/Fantage",
      scale: 0.52,
      x: 60,
      y: 60,
      iconText: "fantage.png",
    },
    {
      hoverString: "Loved",
      src: "images/icons/loved.png",
      url: "https://ocias.com/works/loved/",
      scale: 0.52,
      x: 42,
      y: 22,
      iconText: "loved.png",
    },
    {
      hoverString: "Cause of Death",
      src: "images/icons/cod.png",
      url: "https://tvtropes.org/pmwiki/pmwiki.php/VisualNovel/CauseOfDeath",
      scale: 0.52,
      x: 39,
      y: 65,
      iconText: "cause of death.png",
    },
    {
      hoverString: "( Dreaming Mary )",
      src: "images/icons/dreamingmary.png",
      url: "https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/DreamingMary",
      scale: 0.52,
      x: 10,
      y: 19,
      iconText: "dreaming mary.png",
    },
    {
      hoverString: "( Okami )",
      src: "images/icons/okami.png",
      url: "https://en.wikipedia.org/wiki/%C5%8Ckami",
      scale: 0.52,
      x: 17,
      y: 35,
      iconText: "okami.png",
    },
    {
      hoverString: "( a dark room )",
      src: "images/icons/darkroom.png",
      url: "https://adarkroom.doublespeakgames.com/",
      scale: 0.52,
      x: 5,
      y: 34,
      iconText: "a dark room.png",
    },
    {
      hoverString: "windows93",
      src: "images/icons/windows93.png",
      url: "https://www.windows93.net/",
      scale: 0.52,
      x: 30,
      y: 60,
      iconText: "windows93.png",
    },
    {
      hoverString: "The Wiki Game",
      src: "images/icons/wikigame.png",
      url: "https://www.wikigame.com/",
      scale: 0.52,
      x: 28,
      y: 57,
      iconText: "wikigame.png",
    },
    {
      hoverString: "E.B.O.N.Y.",
      src: "images/icons/ebony.png",
      url: "https://ebonyriddle.com/",
      scale: 0.52,
      x: 28,
      y: 57,
      iconText: "ebony.png",
    },
  ],
  fandoms: [
    {
      hoverString: "TRShady",
      src: "images/icons/trshady.png",
      url: "http://forum.trshady.com/",
      scale: 0.52,
      x: 30,
      y: 60,
      iconText: "trshady.png",
    },
    {
      hoverString: "goodreads",
      src: "images/icons/goodreads.png",
      url: "https://www.goodreads.com/mellyeliu",
      scale: 0.52,
      x: 30,
      y: 60,
      iconText: "goodreads.png",
    },
    {
      hoverString: "Life is Strange",
      src: "images/icons/lis.png",
      url: "https://archiveofourown.org/works/4577451",
      scale: 0.5,
      x: 75,
      y: 25,
      iconText: "life is strange.webloc",
    },
    {
      hoverString: "www.tvtropes.org",
      src: "images/icons/tvtropes.png",
      url: "https://www.tvtropes.org/",
      scale: 0.52,
      x: 25,
      y: 27,
      iconText: "tvtropes.png",
    },
    {
      hoverString: "Deism, Reincarnation, and Creation Myths",
      src: "images/icons/deism.png",
      url: "https://en.wikipedia.org/wiki/Pandeism",
      scale: 0.52,
      x: 76,
      y: 17,
      iconText: "deism.webloc",
    },
    {
      hoverString: "tyler x josh (21p)",
      src: "images/icons/21p.png",
      url: "https://archiveofourown.org/works/8262935",
      scale: 0.5,
      x: 25,
      y: 38,
      iconText: "21p.png",
    },
    {
      hoverString: "everlark ♡",
      src: "images/icons/everlark.png",
      url: "https://archiveofourown.org/works/603428",
      scale: 0.5,
      x: 23,
      y: 65,
      iconText: "dark everlark.webloc",
    },
    {
      hoverString: "azula x mai (atla) ♡",
      src: "images/icons/maizula.png",
      url: "https://archiveofourown.org/works/4249794/chapters/9617619",
      scale: 0.5,
      x: 42,
      y: 48,
      iconText: "tymaizula.webloc",
    },
    {
      hoverString: "joseon-era kdramas",
      src: "images/icons/kdrama.png",
      url: "https://archiveofourown.org/works/4249794/chapters/9617619",
      scale: 0.5,
      x: 50,
      y: 45,
      iconText: "dae jang geum.webloc",
    },
  ],
  tools: [
    {
      hoverString: "are.na",
      src: "images/icons/arena.png",
      url: "https://www.are.na/",
      scale: 0.52,
      x: 45,
      y: 53,
      iconText: "are.na.png",
    },
    {
      hoverString: "z library",
      src: "images/icons/zlib.png",
      url: "https://reddit.com/zlib",
      scale: 0.52,
      x: 35,
      y: 53,
      iconText: "z-lib.png",
    },
    {
      hoverString: "ms paint",
      src: "images/icons/paint.png",
      url: "https://jspaint.app/",
      scale: 0.52,
      x: 35,
      y: 53,
      iconText: "ms paint.png",
    },
    {
      hoverString: "esoteric.codes",
      src: "images/icons/esoteric.png",
      url: "https://www.newgrounds.com/portal/view/518729",
      scale: 0.52,
      x: 51,
      y: 34,
      iconText: "esoteric codes.png",
    },
    {
      hoverString: "( TCRF )",
      src: "images/icons/tcrf.png",
      url: "https://tcrf.net/The_Cutting_Room_Floor",
      scale: 0.52,
      x: 40,
      y: 59,
      iconText: "tcrf.png",
    },
    {
      hoverString: "( daily deviation dream )",
      src: "images/icons/deviantart.png",
      url: "https://www.deviantart.com/",
      scale: 0.52,
      x: 71,
      y: 72,
      iconText: "deviantart.png",
    },
    {
      hoverString: "( MSCHF )",
      src: "images/icons/mschf.png",
      url: "https://www.mschf.com/",
      scale: 0.52,
      x: 37,
      y: 32,
      iconText: "mschf.png",
    },
    {
      hoverString: "Rational Wiki",
      src: "images/icons/rational.png",
      url: "https://rationalwiki.org/wiki/Special:Random",
      scale: 0.52,
      x: 76,
      y: 68,
      iconText: "rational wiki.png",
    },
    {
      hoverString: "( scp foundation )",
      src: "images/icons/scp.png",
      url: "https://scp-wiki.wikidot.com/",
      scale: 0.52,
      x: 50,
      y: 72,
      iconText: "scp.png",
    },
    {
      hoverString: "( Edit Wars )",
      src: "images/icons/wiki.png",
      url: "https://en.wikipedia.org/wiki/User:TheUnmissingPiece",
      scale: 0.52,
      x: 58,
      y: 65,
      iconText: "wiki.jpeg",
    },
  ],
  "About Me": [
    {
      hoverString: "૮꒰ ˶• ༝ •˶꒱ა ♡",
      src: "images/windows/bio.png",
      scale: 0.83,
      border: true,
      x: 68,
      y: 21,
    },
    {
      hoverString: "૮꒰ ˶• ༝ •˶꒱ა ♡",
      src: "images/me/mememe.png",
      scale: 0.5,
      url: "https://vsco.co/mellyeliu/gallery",
      x: 80,
      y: 42,
      iconText: "meee.png",
    },
    {
      hoverString: "૮꒰ ˶• ༝ •˶꒱ა ♡",
      src: "images/me/meme.png",
      scale: 0.5,
      url: "https://vsco.co/mellyeliu/gallery",
      x: 83,
      y: 26,
      iconText: "mee.png",
    },
    {
      hoverString: "૮꒰ ˶• ༝ •˶꒱ა ♡",
      src: "images/me/me.png",
      scale: 0.5,
      url: "https://vsco.co/mellyeliu/gallery",
      x: 60,
      y: 35,
      iconText: "meeee.png",
    },
    {
      hoverString: "( Girlhood )",
      src: "images/windows/emojis.png",
      scale: 0.42,
      border: true,
      x: 58,
      y: 13,
    },
    {
      hoverString: "( Socials )",
      src: "images/windows/socials.png",
      scale: 0.42,
      border: true,
      x: 9,
      y: 28,
    },
    {
      hoverString: "( 🌐🤍🎀🫧 )",
      src: "images/windows/internet.png",
      scale: 0.6,
      border: true,
      x: 17,
      y: 45,
    },
  ],
  Obsessions: [],
};

const socialsContent = (
  <>
    start &#8594; brainstorming for ideas 💭
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
    Melissa is a software engineer and internet artist. Interests include:
    messaging systems, creation myths, fandom as landscaping fictional worlds,
    video game as art form, safe spaces, creative intimacy, pseudoscientific
    personality tests, relational psychology, bed rotting [...] They still
    believe in the goodness of the internet and its potential for connection and
    creativity.
    <br />
    <br />
    In the day they work on core components,{" "}
    <CustomLink
      text="cross-platform integration"
      href="https://github.com/facebook/react-strict-dom"
    />
    , and{" "}
    <CustomLink
      text="open source tooling"
      href="https://github.com/facebook/stylex"
    />{" "}
    for React, the library where they fell in love with coding, and at night
    they use it on random side quests. Previously, they worked on the{" "}
    <CustomLink text="website" href="https://messenger.com" /> that first taught
    them how to talk to people. She still beta tests it every day with her
    friends. The rest of her life is just content fodder for her work.
  </>
);

const emojisContent = <>🎀💿🧸💫</>;

export const windowData = {
  "( Socials )": <ContentBlock content={socialsContent} />,
  "૮꒰ ˶• ༝ •˶꒱ა ♡": (
    <ContentBlock content={bioContent} padding="165px 25px" />
  ),
  "( 🌐🤍🎀🫧 )": (
    <ContentBlock
      content={siteContent}
      textAlign="center"
      padding="170px 50px"
    />
  ),
  "( Girlhood )": (
    <ContentBlock content={emojisContent} textAlign="center" fontSize="48px" />
  ),
};

export default FileData;
