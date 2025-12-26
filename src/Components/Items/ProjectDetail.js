import React from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 140px)", // fill viewport minus nav/start bar area
    color: "#000",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: 6,
    padding: "6px 10px",
    backgroundColor: "white",
  },
  linkButton: {
    cursor: "pointer",
    border: "1px solid black",
    borderRadius: 6,
    padding: "6px 10px",
    backgroundColor: "#f5f5f5",
    textDecoration: "none",
    color: "black",
  },
  layout: {
    display: "flex",
    flexDirection: "row",
    gap: 32,
    width: "100%",
    height: "100%",
    minHeight: "100%",
    color: "#000",
    alignItems: "stretch",
    flex: 1,
    paddingTop: 0,
  },
  imagesCol: {
    flex: "0 0 48%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  image: {
    width: "100%",
    height: "auto",
    border: "1px solid #e0e0e0",
    borderRadius: 6,
    objectFit: "cover",
  },
  divider: {
    width: 1,
    backgroundColor: "black",
    opacity: 0.5,
    alignSelf: "stretch",
    height: "100%",
    minHeight: "100%",
    flexShrink: 0,
  },
  textCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    color: "#000",
    borderLeft: "0.5px solid black",
    paddingLeft: 28,
    paddingRight: 12,
    paddingTop: 0,
    minHeight: "100%",
  },
  title: {
    fontSize: 26,
    margin: 0,
    letterSpacing: "1px",
    color: "#000",
  },
  meta: {
    margin: 0,
    color: "#444",
    fontSize: 15,
  },
  paragraph: {
    margin: 0,
    lineHeight: 1.5,
    fontSize: 15,
    color: "#000",
  },
});

const ProjectDetail = ({ project, onBack }) => {
  const paragraphs = project.longDescription
    ? project.longDescription.split(/\n+/).filter(Boolean)
    : [];

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.imagesCol)}>
          {project.detailImages.map((src, idx) => (
            <img
              key={`${project.slug}-${idx}`}
              src={src}
              alt={`${project.title} ${idx + 1}`}
              draggable="false"
              {...stylex.props(styles.image)}
            />
          ))}
        </div>
        <div {...stylex.props(styles.divider)} />
        <div {...stylex.props(styles.textCol)}>
          <div {...stylex.props(styles.topBar)}>
            <button {...stylex.props(styles.backButton)} onClick={onBack}>
              ← Back
            </button>
            <div style={{ fontFamily: "monospace", fontSize: 14 }}>
              {project.detailUrl}
            </div>
          </div>
          <h2 {...stylex.props(styles.title)}>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                {project.title} ↗
              </a>
            ) : (
              `${project.title}`
            )}{" "}
            — {project.year}
          </h2>
          <p {...stylex.props(styles.meta)}>Made with {project.languages}</p>
          {paragraphs.map((para, idx) => (
            <p key={idx} {...stylex.props(styles.paragraph)}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

ProjectDetail.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    languages: PropTypes.string,
    url: PropTypes.string,
    detailUrl: PropTypes.string,
    longDescription: PropTypes.string,
    detailImages: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};
