import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-web-tabs";
import { useLocation, useHistory } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import BrowserIcons from "../components/portfolio/BrowserIcons";
import ProjectDetail from "../components/portfolio/ProjectDetail";
import { projects, formatProjectDate, getProjectImageUrl } from "../data/PortfolioData";
import { Screen, useDesktopScreen } from "../routes";
import useIsMobile from "../hooks/useIsMobile";
import whenDecoded from "../utils/whenDecoded";
import { colors, fonts, radii, fontSizes } from "../styles/tokens.stylex";

const LOAD_FALLBACK_MS = 4000;
const URL_PREFIX = "C://Users/mellyeliu/Projects/";
const PROJECT_PATH = /^\/portfolio\/projects\/([^/]+)\/?$/;

const TABS = [
  {
    id: "one",
    category: "all",
    path: "/portfolio",
    urlName: "All",
    label: " All ⋆𐙚₊˚⊹♡ ",
    // Shown instead while the star filters All down to favourites.
    selectedUrlName: "Selected",
    selectedLabel: " Selected ⋆𐙚₊˚⊹♡ ",
  },
  { id: "two", category: "code", path: "/portfolio/code", urlName: "Code", label: " Code ‧<₊˚🔗✩ />₊" },
  { id: "three", category: "design", path: "/portfolio/design", urlName: "Design", label: " Design ‧⊹˚🕊️☽₊⟡⋆" },
  { id: "four", category: "games", path: "/portfolio/games", urlName: "Games", label: " Games ‧₊🎧ྀི☾⋆₊⟡⁺." },
  { id: "five", category: "conversation", path: "/portfolio/convos", urlName: "Conversation", label: " Convos ⁺.💭.˚✩˚⊹‧" },
];
const ALL_TAB = TABS[0];

// Names accepted in the fake URL bar, mapped to their tab.
const URL_BAR_ROUTES = {
  all: ALL_TAB,
  selected: ALL_TAB,
  code: TABS[1],
  design: TABS[2],
  games: TABS[3],
  convos: TABS[4],
  conversation: TABS[4],
  conversations: TABS[4],
};

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const PLACEHOLDER_DESCRIPTION =
  "Project details coming soon. This is placeholder copy describing the goals, approach, and outcomes. Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. \n\nHere we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time.\n\n Here we would talk about the initial spark for the work, what the constraints were, and how the design or code evolved over time. We'll also add notes about launch learnings and follow-ups so readers can see how the project grew. \n\nMore images and notes will be added later. For now, enjoy these placeholder visuals.";

const PROJECTS = projects.map((project) => ({
  ...project,
  slug: project.slug || slugify(project.title),
  longDescription: project.longDescription || PLACEHOLDER_DESCRIPTION,
}));

const getTabFromPath = (pathname, projectSlug) => {
  if (projectSlug) return `project-${projectSlug}`;
  const tab = TABS.find((t) => t.path === pathname || `${t.path}/` === pathname);
  return (tab || ALL_TAB).id;
};

// Pinned projects first, then in-progress work, then newest first. Sort is
// stable, so projects with the same dates keep their order in PortfolioData.
const dateKey = (p) => `${p.pinned ? 1 : 0}:${p.endDate === "present" ? 1 : 0}:${p.date}`;
const byNewest = (a, b) => dateKey(b).localeCompare(dateKey(a));

const getVisibleProjects = (category, favouritesOnly) => {
  let list = category === "all" ? PROJECTS : PROJECTS.filter((p) => p.type.includes(category));
  if (favouritesOnly) list = list.filter((p) => p.favourite);
  return [...list].sort(byNewest);
};

const loadImage = (url) =>
  new Promise((resolve) => {
    const image = new Image();
    image.fetchPriority = "high";
    image.decoding = "async";
    const finish = () => {
      image.onload = null;
      image.onerror = null;
      resolve();
    };
    image.onload = () => whenDecoded(image, finish);
    image.onerror = finish;
    image.src = url;
  });

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
    paddingRight: 40,
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
  iconButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 22,
    width: 22,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "transparent",
    backgroundImage: "none",
    backgroundColor: "transparent",
    color: colors.black,
    cursor: "pointer",
    fontStyle: "normal",
    lineHeight: 1,
  },
  favouriteButton: {
    right: 8,
    fontSize: "1.2em",
  },
  // The heading font uses old-style numerals that sit at x-height, so the
  // uppercase month words are shrunk to match them. Bolder so the smaller
  // text keeps the same visual weight as the title.
  dateWord: {
    fontSize: "0.68em",
    fontWeight: 700,
  },
  emptyState: {
    paddingTop: 40,
    textAlign: "center",
    fontFamily: fonts.serif,
    fontStyle: "italic",
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
    right: 12,
  },
  projectImage: {
    height: 200,
    transform: "scale(0.9)",
  },
  madeWith: {
    paddingTop: 8,
  },
  projectLink: {
    display: "block",
    cursor: "pointer",
  },
  projectNoLink: {
    cursor: "default",
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

const Portfolio = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const history = useHistory();
  const [, setDesktopScreen] = useDesktopScreen();

  // The All tab starts on favourites; other tabs start on everything. The star flips it per tab.
  const [favouriteOverrides, setFavouriteOverrides] = useState({});
  const isFavouritesOnly = (tab) => favouriteOverrides[tab.id] ?? tab.category === "all";
  const [backHover, setBackHover] = useState(0);
  const [useMobileDetail, setUseMobileDetail] = useState(true);
  const [readyImageLoadKey, setReadyImageLoadKey] = useState("");
  const [readyProjectImages, setReadyProjectImages] = useState(() => new Set());

  const projectSlug = pathname.match(PROJECT_PATH)?.[1] ?? null;
  const activeProject = projectSlug ? PROJECTS.find((p) => p.slug === projectSlug) : null;
  const projectTabId = activeProject ? `project-${activeProject.slug}` : null;
  const activeTab = getTabFromPath(pathname, projectSlug);
  const activeTabConfig = TABS.find((t) => t.id === activeTab) || ALL_TAB;
  const activeCategory = activeTabConfig.category;
  const favouritesOnly = isFavouritesOnly(activeTabConfig);

  // Hold the grid back until the first row of images is ready, so it fades in whole.
  const priorityImageCount = isMobile ? 1 : 3;
  const priorityImageUrls = useMemo(
    () =>
      (activeProject ? [activeProject] : getVisibleProjects(activeCategory, favouritesOnly))
        .slice(0, priorityImageCount)
        .map((project) => project.image)
        .filter(Boolean)
        .map(getProjectImageUrl),
    [activeProject, activeCategory, favouritesOnly, priorityImageCount]
  );
  const imageLoadKey = `${activeTab}:${priorityImageCount}:${priorityImageUrls.join("|")}`;
  const isContentReady = readyImageLoadKey === imageLoadKey;

  useEffect(() => {
    let cancelled = false;
    const markReady = () => {
      window.clearTimeout(fallbackTimer);
      if (!cancelled) setReadyImageLoadKey(imageLoadKey);
    };
    const fallbackTimer = window.setTimeout(markReady, LOAD_FALLBACK_MS);
    Promise.all(priorityImageUrls.map(loadImage)).then(markReady);

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
    };
  }, [imageLoadKey, priorityImageUrls]);

  // Unknown project slugs fall back to the grid.
  useEffect(() => {
    if (projectSlug && !activeProject) {
      history.replace("/portfolio");
    }
  }, [projectSlug, activeProject, history]);

  const markImageReady = useCallback((imageUrl) => {
    setReadyProjectImages((current) => {
      if (current.has(imageUrl)) return current;
      const next = new Set(current);
      next.add(imageUrl);
      return next;
    });
  }, []);

  const handleTabChange = (tabId) => {
    history.push(
      tabId === projectTabId
        ? `/portfolio/projects/${activeProject.slug}`
        : (TABS.find((t) => t.id === tabId) || ALL_TAB).path
    );
  };

  const handleUrlBarSubmit = (event) => {
    if (event.key !== "Enter") return;
    const lastSegment = event.target.value.trim().split("/").pop().trim().toLowerCase();
    const tab = URL_BAR_ROUTES[lastSegment];
    if (tab) {
      history.push(tab.path);
      if (tab === ALL_TAB) {
        setFavouriteOverrides((prev) => ({ ...prev, [ALL_TAB.id]: lastSegment === "selected" }));
      }
      event.target.value = `${URL_PREFIX}${lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}`;
    }
  };

  const renderUrlBar = (urlName, content, { grid = true, showLayoutToggle = false } = {}) => {
    const fadedContent = (
      <div
        aria-busy={!isContentReady}
        style={{ opacity: isContentReady ? 1 : 0, transition: "opacity 250ms ease-out" }}
      >
        {content}
      </div>
    );

    return (
      <>
        <div {...stylex.props(styles.urlBarContainer)}>
          {backHover === 1 && <div {...stylex.props(styles.backHoverCircle(12))} />}
          {backHover === 3 && <div {...stylex.props(styles.backHoverCircle(102))} />}
          <div {...stylex.props(styles.navPadding)}>
            <svg
              width="25"
              height="30"
              onClick={() => setDesktopScreen(Screen.HOME)}
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
            <span {...stylex.props(styles.spacerLarge)}> &nbsp; &nbsp; &nbsp;</span>
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
              key={urlName}
              type="text"
              onKeyDown={handleUrlBarSubmit}
              {...stylex.props(styles.urlInput)}
              defaultValue={`${URL_PREFIX}${urlName}`}
            />
            {grid && (
              <button
                type="button"
                title={favouritesOnly ? "Show all projects" : "Show favourites"}
                aria-label="Show favourites only"
                aria-pressed={favouritesOnly}
                onClick={() =>
                  setFavouriteOverrides((prev) => ({ ...prev, [activeTab]: !favouritesOnly }))
                }
                {...stylex.props(styles.iconButton, styles.favouriteButton)}
              >
                {favouritesOnly ? "✮" : "✩"}
              </button>
            )}
            {showLayoutToggle && (
              <button
                onClick={() => setUseMobileDetail((prev) => !prev)}
                {...stylex.props(styles.layoutToggle)}
              >
                {useMobileDetail ? "Desktop layout" : "Alt layout"}
              </button>
            )}
          </div>
        </div>
        {grid ? (
          <div
            id="portfolio-wrapper"
            className="bgrid-thirds s-bgrid-thirds cf"
            style={{
              padding: isMobile ? "70px 10px 100px" : "50px 80px",
              minHeight: isMobile ? "calc(100vh / 1.1 - 180px)" : "calc(100vh / 1.1 - 200px)",
            }}
          >
            {fadedContent}
          </div>
        ) : (
          <div>{fadedContent}</div>
        )}
      </>
    );
  };

  const renderProject = (project, index) => {
    const imageUrl = getProjectImageUrl(project.image);
    const isPriorityImage = index < priorityImageCount;
    const isImageReady = readyProjectImages.has(imageUrl);

    const card = (
      <>
        <img
          draggable="false"
          alt={project.title}
          src={imageUrl}
          loading={isPriorityImage ? "eager" : "lazy"}
          fetchPriority={isPriorityImage ? "high" : "low"}
          decoding="async"
          onLoad={(event) => whenDecoded(event.currentTarget, () => markImageReady(imageUrl))}
          onError={() => markImageReady(imageUrl)}
          {...stylex.props(styles.projectImage)}
        />
        <div style={{ height: 100, width: "100%" }}>
          <div
            className="portfolio-item-meta"
            style={{ paddingBottom: 18, paddingLeft: 18, paddingRight: 18 }}
          >
            <h5>
              &#40;{index + 1}&#41; {project.title};{" "}
              {formatProjectDate(project)
                .split(/([A-Za-z]+)/)
                .map((part, i) =>
                  i % 2 ? (
                    <span key={i} {...stylex.props(styles.dateWord)}>
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
            </h5>
            <p className="collab">
              {project.description} {project.collaborators && "Collaborators: "}
              {project.collaborators?.map((collaborator, i) => (
                <React.Fragment key={collaborator.name}>
                  {i > 0 && ", "}
                  <a
                    href={collaborator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="collab"
                    style={{ display: "inline", color: "inherit" }}
                  >
                    {collaborator.name}
                  </a>
                </React.Fragment>
              ))}
            </p>
            <p {...stylex.props(styles.madeWith)}>Made with {project.languages}, &lt;3</p>
          </div>
        </div>
      </>
    );

    return (
      <div
        key={project.title}
        style={{
          padding: "0 15px",
          opacity: isImageReady ? 1 : 0,
          transition: "opacity 160ms ease-out",
        }}
        aria-busy={!isImageReady}
        className="two columns portfolio-item"
      >
        <div {...stylex.props(styles.hvrGrow)}>
          {project.url ? (
            <a
              target="_blank"
              href={project.url}
              rel="noopener noreferrer"
              {...stylex.props(styles.projectLink)}
            >
              {card}
            </a>
          ) : (
            <div {...stylex.props(styles.projectNoLink)}>{card}</div>
          )}
        </div>
      </div>
    );
  };

  // Only the visible tab's panel renders its contents; hidden panels stay empty.
  const renderTabPanel = (tab) => {
    if (activeTab !== tab.id) return <TabPanel key={tab.id} tabId={tab.id} />;
    const visible = getVisibleProjects(tab.category, isFavouritesOnly(tab));
    return (
      <TabPanel key={tab.id} tabId={tab.id}>
        {renderUrlBar(
          tab.selectedUrlName && isFavouritesOnly(tab) ? tab.selectedUrlName : tab.urlName,
          visible.length > 0 ? (
            visible.map(renderProject)
          ) : (
            <p {...stylex.props(styles.emptyState)}>No favourites here yet ✩</p>
          )
        )}
      </TabPanel>
    );
  };

  return (
    <section id="portfolio">
      <div
        className="row fade-in custom-scrollbar visible"
        style={{ height: "100%", backgroundColor: "white", width: "100%", maxWidth: "100%" }}
      >
        <div style={{ marginBottom: -15 }} className="tagline"></div>
        <div className="twelve columns collapsed" style={{ height: "100%" }}>
          <Tabs defaultTab={activeTab}>
            <TabList {...stylex.props(styles.tabList)}>
              <div {...stylex.props(styles.tabSpacer)}></div>
              <Tab
                {...stylex.props(styles.tab)}
                tabFor={ALL_TAB.id}
                onClick={() => handleTabChange(ALL_TAB.id)}
              >
                {isFavouritesOnly(ALL_TAB) ? ALL_TAB.selectedLabel : ALL_TAB.label}
              </Tab>
              {activeProject ? (
                <Tab
                  {...stylex.props(styles.projectTab)}
                  tabFor={projectTabId}
                  onClick={() => handleTabChange(projectTabId)}
                >
                  <span {...stylex.props(styles.projectTabTitle)}>{activeProject.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(ALL_TAB.path);
                    }}
                    {...stylex.props(styles.closeButton)}
                  >
                    ×
                  </button>
                </Tab>
              ) : (
                TABS.slice(1).map((tab) => (
                  <Tab
                    key={tab.id}
                    {...stylex.props(styles.tab)}
                    tabFor={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                  </Tab>
                ))
              )}
              <BrowserIcons />
            </TabList>
            {activeProject ? (
              <>
                <TabPanel tabId={ALL_TAB.id} />
                <TabPanel tabId={projectTabId}>
                  {activeTab === projectTabId &&
                    renderUrlBar(activeProject.title, <ProjectDetail project={activeProject} />, {
                      grid: false,
                      showLayoutToggle: true,
                    })}
                </TabPanel>
              </>
            ) : (
              TABS.map(renderTabPanel)
            )}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
