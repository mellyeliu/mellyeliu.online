import React from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    color: "#000",
    fontFamily: "opensans-light",
    paddingTop: 50,
  },
  image: {
    width: "100%",
    maxWidth: 720,
    height: "auto",
    alignSelf: "center",
    objectFit: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    color: "#000",
    fontFamily: "Cormorant Garamond",
  },
  titleLink: {
    color: "inherit",
    textDecoration: "underline",
  },
  meta: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    color: "#444",
    fontSize: 15,
  },
  paragraph: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    lineHeight: 1.5,
    fontSize: 14,
    color: "#000",
  },
});

const ProjectDetailMobile = ({ project }) => {
  const coverSrc =
    project.image &&
    (project.image.startsWith("http")
      ? project.image
      : `${window.location.origin}/images/portfolio/${project.image}`);

  const paragraphs = project.longDescription
    ? project.longDescription.split(/\n+/).filter(Boolean)
    : [];

  return (
    <div {...stylex.props(styles.container)}>
      {coverSrc && (
        <img
          src={coverSrc}
          alt={project.title}
          draggable="false"
          {...stylex.props(styles.image)}
        />
      )}
      <div>
        <h2 {...stylex.props(styles.title)}>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              {...stylex.props(styles.titleLink)}
            >
              {project.title} ↗
            </a>
          ) : (
            project.title
          )}{" "}
          — {project.year}
        </h2>
      </div>
      {paragraphs.map((p, idx) => (
        <p key={idx} {...stylex.props(styles.paragraph)}>
          {p}
        </p>
      ))}
    </div>
  );
};

ProjectDetailMobile.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    year: PropTypes.string,
    languages: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    longDescription: PropTypes.string,
  }).isRequired,
};

export default ProjectDetailMobile;
