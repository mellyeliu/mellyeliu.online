import React, { useState, useEffect, useRef, useMemo } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { useLocation, useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import PortfolioData from "../../Data/PortfolioData";
import { Screen } from "../../App";
import { useMediaQuery } from "react-responsive";
import BrowserIcons from "../Items/BrowserIcons";
import ReactHtmlParser from "react-html-parser";
import ProjectDetailMobile from "../Items/ProfileDetail";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, radii, fontSizes } from "../../styles/tokens.stylex";

const styles = stylex.create({
  hvrGrow: {
    display: "inline-block",
    verticalAlign: "middle",
    transform: {
      default: "translateZ(0)",
      ":hover": "scale(1.035)",
      ":focus": "scale(1.035)",
      ":active": "scale(1.035)",
    },
    boxShadow: "0 0 1px rgba(0, 0, 0, 0)",
    backfaceVisibility: "hidden",
    transitionDuration: "0.3s",
    transitionProperty: "transform",
  },
  urlBarContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "nowrap",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    top: 60,
    backgroundImage: "none",
    backgroundColor: colors.bgWhite,
    zIndex: 100,
    left: 0,
  },
  backHoverCircle: (left) => ({
    position: "absolute",
    top: 15,
    left: left,
    width: 30,
    height: 30,
    borderRadius: radii.full,
    backgroundImage: "none",
    backgroundColor: "#eee",
    zIndex: -100,
  }),
  navPadding: {
    padding: 18,
  },
  backArrow: {
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  spacer: {
    width: 15,
  },
  spacerLarge: {
    width: 10,
  },
  forwardArrow: {
    fill: "#bbb",
  },
  refreshContainer: {
    height: 30,
    top: 19,
    position: "absolute",
    width: 20,
    display: "inline-block",
    marginRight: 10,
  },
  refreshIcon: {
    cursor: "pointer",
  },
  urlInputContainer: {
    flexGrow: 1,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
    letterSpacing: 2,
    marginTop: 15,
    marginRight: 20,
    marginBottom: 15,
    marginLeft: 25,
    height: 30,
    float: "right",
    color: colors.black,
    fontFamily: fonts.serif,
    fontStyle: "italic",
    paddingLeft: 20,
    borderRadius: radii.xl,
    position: "relative",
  },
  urlInput: {
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "transparent",
    backgroundImage: "none",
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    fontFamily: fonts.serif,
    outline: "none",
    color: "inherit",
    font: "inherit",
    cursor: "text",
    width: "100%",
  },
  favouriteButton: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontStyle: "normal",
    fontSize: "1.2em",
  },
  favouriteButtonMobile: {
    display: "none",
  },
  favouriteButtonDesktop: {
    display: "block",
  },
  layoutToggle: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.black,
    backgroundImage: "none",
    backgroundColor: colors.bgWhite,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    cursor: "pointer",
    borderRadius: radii.lg,
    fontSize: fontSizes.sm,
  },
  layoutToggleMobile: {
    right: 12,
  },
  layoutToggleDesktop: {
    right: 48,
  },
  portfolioWrapperMobile: {
    paddingTop: 70,
    paddingRight: 10,
    paddingBottom: 100,
    paddingLeft: 10,
    minHeight: "calc(100vh - 180px)",
  },
  portfolioWrapperDesktop: {
    paddingTop: 50,
    paddingRight: 80,
    paddingBottom: 50,
    paddingLeft: 80,
    minHeight: "calc(100vh - 200px)",
  },
  projectImage: {
    height: 200,
    transform: "scale(0.9)",
  },
  projectMetaContainer: {
    height: 100,
    width: "100%",
  },
  projectMeta: {
    paddingBottom: 18,
    paddingLeft: 18,
    paddingRight: 18,
  },
  collaboratorLink: {
    display: "inline",
    color: "inherit",
  },
  madeWith: {
    paddingTop: 8,
  },
  projectItem: {
    paddingTop: 0,
    paddingRight: 15,
    paddingBottom: 0,
    paddingLeft: 15,
  },
  projectLink: {
    display: "block",
    cursor: "pointer",
  },
  projectNoLink: {
    cursor: "default",
  },
  sectionContainer: {
    height: "100%",
    backgroundImage: "none",
    backgroundColor: colors.bgWhite,
    width: "100%",
    maxWidth: "100%",
  },
  tagline: {
    marginBottom: -15,
  },
  columnsContainer: {
    height: "100%",
  },
  tabList: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: 0,
  },
  tabSpacer: {
    height: 5,
  },
  tab: {
    zIndex: 100000,
  },
  projectTab: {
    zIndex: 100000,
    display: "flex",
    alignItems: "center",
    gap: 6,
    paddingRight: 10,
    paddingLeft: 10,
    whiteSpace: "nowrap",
  },
  projectTabTitle: {
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "transparent",
    backgroundImage: "none",
    backgroundColor: "transparent",
    paddingTop: 0,
    paddingRight: 6,
    paddingBottom: 0,
    paddingLeft: 6,
    borderRadius: radii.sm,
    cursor: "pointer",
    fontSize: fontSizes.sm,
    lineHeight: "18px",
    color: "inherit",
    position: "relative",
    right: 0,
  },
});

const Portfolio = ({ setDesktopScreen }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const location = useLocation();
  const history = useHistory();

  const [isVisible] = useState(true);
  const [favourite, setFavourite] = useState("✩");
  const [activeTab, setActiveTab] = useState("one");
  const tabTwoRef = useRef(null);
  const [backHover, setBackHover] = useState(0);
  const [useMobileDetail, setUseMobileDetail] = useState(true);

  // Map URL paths to tab IDs
  const getTabFromPath = (pathname, projectSlug) => {
    if (projectSlug) return `project-${projectSlug}`;
    if (pathname === "/portfolio" || pathname === "/portfolio/") return "one";
    if (pathname === "/portfolio/code") return "two";
    if (pathname === "/portfolio/design") return "three";
    if (pathname === "/portfolio/games") return "four";
    if (pathname === "/portfolio/convos") return "five";
    return "one";
  };

  // Map tab IDs to URL paths
  const getPathFromTab = (tabId) => {
    if (tabId.startsWith("project-") && activeProject) {
      return `/portfolio/projects/${activeProject.slug}`;
    }
    switch (tabId) {
      case "one":
        return "/portfolio";
      case "two":
        return "/portfolio/code";
      case "three":
        return "/portfolio/design";
      case "four":
        return "/portfolio/games";
      case "five":
        return "/portfolio/convos";
      default:
        return "/portfolio";
    }
  };

  // Update active tab based on URL
  useEffect(() => {
    const projectMatchInner = location.pathname.match(
      /^\/portfolio\/projects\/([^/]+)\/?$/
    );
    const slug = projectMatchInner ? projectMatchInner[1] : null;
    const tabFromPath = getTabFromPath(location.pathname, slug);
    setActiveTab(tabFromPath);
  }, [location.pathname]);

  const slugify = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const projectsWithMeta = useMemo(() => {
    const placeholderParagraph =
      "Project details coming soon. This is placeholder copy describing the goals, approach, and outcomes. Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. \n\nHere we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time.\n\n Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. We'll also add notes about launch learnings and follow-ups so readers can see how the project grew. ";
    return PortfolioData.portfolio.projects.map((project) => {
      const slug = project.slug || slugify(project.title);
      return {
        ...project,
        slug,
        detailUrl: project.detailUrl || `/portfolio/projects/${slug}`,
        longDescription:
          project.longDescription ||
          `${placeholderParagraph}\n\nMore images and notes will be added later. For now, enjoy these placeholder visuals.`,
        detailImages: project.detailImages || [
          `https://via.placeholder.com/640x360?text=${encodeURIComponent(
            project.title
          )}+1`,
          `https://via.placeholder.com/640x360?text=${encodeURIComponent(
            project.title
          )}+2`,
        ],
      };
    });
  }, []);

  const projectMatch = location.pathname.match(
    /^\/portfolio\/projects\/([^/]+)\/?$/
  );
  const activeProject = projectMatch
    ? projectsWithMeta.find((p) => p.slug === projectMatch[1])
    : null;
  const projectTabId = activeProject ? `project-${activeProject.slug}` : null;

  useEffect(() => {
    if (projectMatch && !activeProject) {
      history.replace("/portfolio");
    }
  }, [projectMatch, activeProject, history]);

  const handleInputChange = (event) => {
    if (event.target.value === "YES" && tabTwoRef.current) {
      setActiveTab("two");
      history.push("/portfolio/code");
    }
  };

  const handleFavourite = () => {
    setFavourite(favourite === "✩" ? "✮" : "✩");
  };

  // Handle tab changes and update URL
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const newPath = getPathFromTab(tabId);
    history.push(newPath);
  };

  const urlBar = (
    tab,
    tabContent,
    useWrapper = true,
    showLayoutToggle = false
  ) => {
    return (
      <>
        <div {...stylex.props(styles.urlBarContainer)}>
          {backHover === 1 && (
            <div {...stylex.props(styles.backHoverCircle(12))} />
          )}
          {backHover === 3 && (
            <div {...stylex.props(styles.backHoverCircle(102))} />
          )}
          <div {...stylex.props(styles.navPadding)}>
            <svg
              width="25"
              height="30"
              onClick={() => {
                setDesktopScreen(Screen.HOME);
              }}
              xmlns="http://www.w3.org/2000/svg"
              {...stylex.props(styles.backArrow)}
              onMouseEnter={() => setBackHover(1)}
              onMouseLeave={() => setBackHover(0)}
            >
              <path
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.528 6.236h-12.884v1h21.883z"
                transform="scale(-1, 1) translate(-24, 0)"
                fill="black"
              />
            </svg>

            <span {...stylex.props(styles.spacer)}>&nbsp;&nbsp;&nbsp;</span>
            <svg
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              {...stylex.props(styles.forwardArrow)}
              onMouseEnter={() => setBackHover(2)}
              onMouseLeave={() => setBackHover(0)}
            >
              <path
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-12.884v1h21.883z"
                transform="translate(-4, 0)"
              />
            </svg>
            <span {...stylex.props(styles.spacerLarge)}>
              {" "}
              &nbsp; &nbsp; &nbsp;
            </span>
            <div {...stylex.props(styles.refreshContainer)}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                {...stylex.props(styles.refreshIcon)}
                onMouseEnter={() => setBackHover(3)}
                onMouseLeave={() => setBackHover(0)}
              >
                <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
              </svg>
            </div>
          </div>
          <div {...stylex.props(styles.urlInputContainer)}>
            {" "}
            <input
              type="text"
              onChange={handleInputChange}
              {...stylex.props(styles.urlInput)}
              defaultValue={`C://Users/mellyeliu/Projects/${tab}`}
            />
            <div
              onClick={handleFavourite}
              {...stylex.props(
                styles.favouriteButton,
                isMobile
                  ? styles.favouriteButtonMobile
                  : styles.favouriteButtonDesktop
              )}
            >
              {favourite}
            </div>
            {showLayoutToggle && (
              <button
                onClick={() => setUseMobileDetail((prev) => !prev)}
                {...stylex.props(
                  styles.layoutToggle,
                  isMobile
                    ? styles.layoutToggleMobile
                    : styles.layoutToggleDesktop
                )}
              >
                {useMobileDetail ? "Desktop layout" : "Alt layout"}
              </button>
            )}
          </div>
        </div>
        {useWrapper ? (
          <div
            id="portfolio-wrapper"
            className="bgrid-thirds s-bgrid-thirds cf"
            style={{
              padding: isMobile ? "70px 10px 100px" : "50px 80px",
              minHeight: isMobile
                ? "calc(100vh - 180px)"
                : "calc(100vh - 200px)",
            }}
          >
            <Fade duration={500} delay={100}>
              {tabContent}
            </Fade>
          </div>
        ) : (
          <div>
            <Fade duration={500} delay={100}>
              {tabContent}
            </Fade>
          </div>
        )}
      </>
    );
  };

  const getProjects = (projects, category) => {
    const filteredProjects =
      category === "all"
        ? projects
        : projects.filter((item) => item.type.includes(category));

    return filteredProjects.map(function (projects, i) {
      var projectImage =
        window.location.origin + "/images/portfolio/" + projects.image;

      var project = (
        <>
          <img
            draggable="false"
            alt={projects.title}
            src={projectImage}
            {...stylex.props(styles.projectImage)}
          />
          <div style={{ height: 100, width: "100%" }}>
            <div
              className="portfolio-item-meta"
              style={{
                paddingBottom: 18,
                paddingLeft: 18,
                paddingRight: 18,
              }}
            >
              <h5>
                &#40;{i + 1}&#41; {projects.title}; {projects.year}
              </h5>
              <p className="collab">
                {ReactHtmlParser(projects.description)}{" "}
                {projects.collaborators && "Collaborators: "}
                {projects.collaborators && projects.collaborators.length > 0
                  ? projects.collaborators
                      .map((collaborator) => (
                        <a
                          key={collaborator.name}
                          href={collaborator.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="collab"
                          style={{ display: "inline", color: "inherit" }}
                        >
                          {collaborator.name}
                        </a>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                  : null}
              </p>
              <p {...stylex.props(styles.madeWith)}>
                Made with {projects.languages}, &lt;3
              </p>
            </div>
          </div>
        </>
      );
      return (
        <div
          key={projects.title}
          style={{ padding: "0 15px" }}
          className="two columns portfolio-item"
        >
          <div {...stylex.props(styles.hvrGrow)}>
            {projects.url ? (
              <a
                target="_blank"
                href={projects.url}
                rel="noopener noreferrer"
                {...stylex.props(styles.projectLink)}
              >
                {project}
              </a>
            ) : (
              <div {...stylex.props(styles.projectNoLink)}>{project}</div>
            )}
          </div>
        </div>
      );
    });
  };

  const projects = getProjects(projectsWithMeta, "all");
  const code = getProjects(projectsWithMeta, "code");
  const design = getProjects(projectsWithMeta, "design");
  const games = getProjects(projectsWithMeta, "games");
  const conversation = getProjects(projectsWithMeta, "conversation");
  return (
    <section id="portfolio">
      <div
        className={`row fade-in custom-scrollbar ${isVisible ? "visible" : ""}`}
        style={{
          height: "100%",
          backgroundColor: "white",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Fade top>
          <div style={{ marginBottom: -15 }} className="tagline"></div>
        </Fade>
        <div className="twelve columns collapsed" style={{ height: "100%" }}>
          <Tabs defaultTab={activeTab}>
            <TabList {...stylex.props(styles.tabList)}>
              <div {...stylex.props(styles.tabSpacer)}></div>
              <Tab
                {...stylex.props(styles.tab)}
                tabFor="one"
                onClick={() => handleTabChange("one")}
              >
                {" "}
                All ⋆𐙚₊˚⊹♡{" "}
              </Tab>
              {activeProject ? (
                <Tab
                  {...stylex.props(styles.projectTab)}
                  tabFor={projectTabId}
                  onClick={() => handleTabChange(projectTabId)}
                >
                  <span {...stylex.props(styles.projectTabTitle)}>
                    {activeProject.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push("/portfolio");
                      setActiveTab("one");
                    }}
                    {...stylex.props(styles.closeButton)}
                  >
                    ×
                  </button>
                </Tab>
              ) : (
                <>
                  <Tab
                    selected={activeTab === "two"}
                    ref={tabTwoRef}
                    {...stylex.props(styles.tab)}
                    tabFor="two"
                    onClick={() => handleTabChange("two")}
                  >
                    {" "}
                    Code ‧&lt;₊˚🔗✩ /&gt;₊
                  </Tab>
                  <Tab
                    {...stylex.props(styles.tab)}
                    tabFor="three"
                    onClick={() => handleTabChange("three")}
                  >
                    {" "}
                    Design ‧⊹˚🕊️☽₊⟡⋆
                  </Tab>
                  <Tab
                    {...stylex.props(styles.tab)}
                    tabFor="four"
                    onClick={() => handleTabChange("four")}
                  >
                    {" "}
                    Games ‧₊🎧ྀི☾⋆₊⟡⁺.
                  </Tab>
                  <Tab
                    {...stylex.props(styles.tab)}
                    tabFor="five"
                    onClick={() => handleTabChange("five")}
                  >
                    {" "}
                    Convos ⁺.💭.˚✩˚⊹‧
                  </Tab>
                </>
              )}
              <BrowserIcons setDesktopScreen={setDesktopScreen} />
            </TabList>
            <TabPanel tabId="one">
              {urlBar(
                "All",
                activeProject ? (
                  <ProjectDetailMobile project={activeProject} />
                ) : (
                  projects
                ),
                !activeProject,
                !!activeProject
              )}
            </TabPanel>
            {activeProject ? (
              <TabPanel tabId={projectTabId}>
                {urlBar(
                  activeProject.title,
                  <ProjectDetailMobile project={activeProject} />,
                  false,
                  true
                )}
              </TabPanel>
            ) : (
              <>
                <TabPanel tabId="two">
                  {urlBar("Code", code, true, false)}
                </TabPanel>
                <TabPanel tabId="three">
                  {urlBar("Design", design, true, false)}
                </TabPanel>
                <TabPanel tabId="four">
                  {urlBar("Games", games, true, false)}
                </TabPanel>
                <TabPanel tabId="five">
                  {urlBar("Conversation", conversation, true, false)}
                </TabPanel>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

Portfolio.propTypes = {
  setDesktopScreen: PropTypes.func.isRequired,
};
