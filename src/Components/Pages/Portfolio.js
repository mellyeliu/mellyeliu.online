import React, { useState, useEffect, useRef, useMemo } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { useLocation, useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import PortfolioData from "../../Data/PortfolioData";
import { Screen } from "../../App";
import { useMediaQuery } from "react-responsive";
import BrowserIcons from "../Items/BrowserIcons";
import ReactHtmlParser from "react-html-parser";
import ProjectDetail from "../Items/ProjectDetail";
import PropTypes from "prop-types";

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

  // Map URL paths to tab IDs
  const getTabFromPath = (pathname) => {
    if (pathname.startsWith("/portfolio/projects/")) {
      return "one";
    }
    if (pathname === "/portfolio" || pathname === "/portfolio/") {
      return "one"; // All tab
    } else if (pathname === "/portfolio/code") {
      return "two";
    } else if (pathname === "/portfolio/design") {
      return "three";
    } else if (pathname === "/portfolio/games") {
      return "four";
    } else if (pathname === "/portfolio/convos") {
      return "five";
    }
    return "one"; // Default to All
  };

  // Map tab IDs to URL paths
  const getPathFromTab = (tabId) => {
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
    const tabFromPath = getTabFromPath(location.pathname);
    setActiveTab(tabFromPath);
  }, [location.pathname]);

  const slugify = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const projectsWithMeta = useMemo(() => {
    const placeholderParagraph =
      "Project details coming soon. This is placeholder copy describing the goals, approach, and outcomes. Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. \n\nHere we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time.\n\n Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. We’ll also add notes about launch learnings and follow-ups so readers can see how the project grew. ";
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

  const urlBar = (tab, tabContent, useWrapper = true) => {
    return (
      <>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "nowrap",
            borderBottom: "0.5px solid black",
            height: 60,
            justifyContent: "center",
            position: "absolute",
            top: 60,
            backgroundColor: "white",
            borderTop: "0.5px solid black",
            zIndex: 100,
            left: 0,
          }}
        >
          {backHover === 1 && (
            <div
              style={{
                position: "absolute",
                top: "15px",
                left: "12px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#eee",
                zIndex: -100,
              }}
            />
          )}
          {backHover === 3 && (
            <div
              style={{
                position: "absolute",
                top: "15px",
                left: "102px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "#eee",
                zIndex: -100,
              }}
            />
          )}
          <div style={{ padding: 18 }}>
            <svg
              width="25"
              height="30"
              onClick={() => {
                setDesktopScreen(Screen.HOME);
              }}
              xmlns="http://www.w3.org/2000/svg"
              style={{
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={() => setBackHover(1)}
              onMouseLeave={() => setBackHover(0)}
            >
              <path
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.528 6.236h-12.884v1h21.883z"
                transform="scale(-1, 1) translate(-24, 0)" // Horizontal reflection of the SVG
                fill="black" // Ensures the arrow stays black
              />
            </svg>

            <span style={{ width: 15 }}>&nbsp;&nbsp;&nbsp;</span>
            <svg
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "#bbb" }}
              onMouseEnter={() => setBackHover(2)}
              onMouseLeave={() => setBackHover(0)}
            >
              <path
                d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-12.884v1h21.883z"
                transform="translate(-4, 0)"
              />
            </svg>
            <span style={{ width: 10 }}> &nbsp; &nbsp; &nbsp;</span>
            <div
              style={{
                height: 30,
                top: 19,
                position: "absolute",
                width: 20,
                display: "inline-block",
                marginRight: 10,
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setBackHover(3)}
                onMouseLeave={() => setBackHover(0)}
              >
                <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
              </svg>
            </div>
          </div>
          <div
            style={{
              flexGrow: 1,
              border: "0.5px solid black",
              letterSpacing: 2,
              margin: "15px 20px 15px 25px",
              height: 30,
              float: "right",
              color: "black",
              fontFamily: "Cormorant Garamond",
              fontStyle: "italic",
              paddingLeft: 20,
              borderRadius: 20,
              position: "relative",
            }}
          >
            {" "}
            <input
              type="text"
              onChange={handleInputChange}
              style={{
                border: "none",
                background: "none",
                padding: "0",
                margin: "0",
                fontFamily: "Cormorant Garamond",
                outline: "none",
                color: "inherit",
                font: "inherit",
                cursor: "text",
                width: "100%",
              }}
              defaultValue={`C://Users/mellyeliu/Projects/${tab}`}
            />
            <div
              onClick={handleFavourite}
              style={{
                position: "absolute",
                top: "50%",
                display: isMobile ? "none" : "block",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontStyle: "normal",
                fontSize: "1.2em",
              }}
            >
              {favourite}
            </div>
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
            style={{
              height: 200,
              transform: "scale(0.9)",
            }}
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
                          style={{
                            display: "inline",
                            color: "inherit",
                          }}
                        >
                          {collaborator.name}
                        </a>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])
                  : null}
              </p>
              <p style={{ paddingTop: 8 }}>
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
          <div className="hvr-grow">
            {projects.url ? (
              <a
                target="_blank"
                href={projects.url}
                rel="noopener noreferrer"
                style={{ display: "block", cursor: "pointer" }}
              >
                {project}
              </a>
            ) : (
              <div style={{ cursor: "default" }}>{project}</div>
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
            <TabList>
              <div style={{ height: 5 }}></div>
              <Tab
                style={{ zIndex: 100000 }}
                tabFor="one"
                onClick={() => handleTabChange("one")}
              >
                {" "}
                All ⋆𐙚₊˚⊹♡{" "}
              </Tab>
              <Tab
                selected={activeTab === "two"}
                ref={tabTwoRef}
                style={{ zIndex: 100000 }}
                tabFor="two"
                onClick={() => handleTabChange("two")}
              >
                {" "}
                Code ‧&lt;₊˚🔗✩ /&gt;₊
              </Tab>
              <Tab
                style={{ zIndex: 100000 }}
                tabFor="three"
                onClick={() => handleTabChange("three")}
              >
                {" "}
                Design ‧⊹˚🕊️☽₊⟡⋆
              </Tab>
              <Tab
                style={{ zIndex: 100000 }}
                tabFor="four"
                onClick={() => handleTabChange("four")}
              >
                {" "}
                Games ‧₊🎧ྀི☾⋆₊⟡⁺.
              </Tab>
              <Tab
                style={{ zIndex: 100000 }}
                tabFor="five"
                onClick={() => handleTabChange("five")}
              >
                {" "}
                Convos ⁺.💭.˚✩˚⊹‧
              </Tab>
              <BrowserIcons setDesktopScreen={setDesktopScreen} />
              {/* <span className="browsero">○ ○ ○</span> */}
            </TabList>
            <TabPanel tabId="one">
              {urlBar(
                "All",
                activeProject ? (
                  <ProjectDetail project={activeProject} />
                ) : (
                  projects
                ),
                !activeProject
              )}
            </TabPanel>
            <TabPanel tabId="two">
              {urlBar(
                "Code",
                activeProject ? (
                  <ProjectDetail project={activeProject} />
                ) : (
                  code
                ),
                !activeProject
              )}
            </TabPanel>
            <TabPanel tabId="three">
              {urlBar(
                "Design",
                activeProject ? (
                  <ProjectDetail project={activeProject} />
                ) : (
                  design
                ),
                !activeProject
              )}
            </TabPanel>
            <TabPanel tabId="four">
              {urlBar(
                "Games",
                activeProject ? (
                  <ProjectDetail project={activeProject} />
                ) : (
                  games
                ),
                !activeProject
              )}
            </TabPanel>
            <TabPanel tabId="five">
              {urlBar(
                "Conversation",
                activeProject ? (
                  <ProjectDetail project={activeProject} />
                ) : (
                  conversation
                ),
                !activeProject
              )}
            </TabPanel>
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
