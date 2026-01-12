import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
    height: "100%",
    minHeight: "calc(100vh - 140px)",
    color: "#000",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 6,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundImage: "none",
    backgroundColor: "white",
  },
  linkButton: {
    cursor: "pointer",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 6,
    paddingTop: 6,
    paddingRight: 10,
    paddingBottom: 6,
    paddingLeft: 10,
    backgroundImage: "none",
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
    marginBottom: -10,
    marginTop: 48,
  },
  imagesCol: {
    flex: "0 0 33%",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  divider: {
    width: 1,
    backgroundImage: "none",
    backgroundColor: "black",
    opacity: 0.5,
    alignSelf: "stretch",
    height: "100%",
    minHeight: "100%",
    flexShrink: 0,
  },
  textCol: {
    flex: "1 1 67%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    borderLeftWidth: 0.5,
    borderLeftStyle: "solid",
    borderLeftColor: "black",
    paddingLeft: 28,
    paddingRight: 12,
    paddingTop: 100,
    minHeight: "100%",
    color: "#000",
    fontFamily: "opensans-light",
    fontSize: 12,
  },
  title: {
    fontSize: 24,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    color: "#000",
    fontWeight: 600,
    fontFamily: "Cormorant Garamond",
  },
  titleLink: {
    color: "inherit",
    fontFamily: "inherit",
  },
  meta: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    color: "#444",
    fontSize: 14,
  },
  paragraph: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    lineHeight: 1.5,
    fontSize: 12,
    color: "#000",
  },
});

const ProjectDetail = ({ project }) => {
  const [resolvedImages, setResolvedImages] = useState(
    project.detailImages || []
  );
  const coverSrc =
    project.image &&
    (project.image.startsWith("http")
      ? project.image
      : `${window.location.origin}/images/portfolio/${project.image}`);

  useEffect(() => {
    let cancelled = false;
    const exts = ["png", "jpg", "jpeg", "webp", "gif"];
    const maxImages = 12;

    const probe = async () => {
      const found = [];
      for (let i = 1; i <= maxImages; i++) {
        for (const ext of exts) {
          const url = `/images/portfolio/${project.slug}/${i}.${ext}`;
          try {
            const res = await fetch(url, { method: "HEAD" });
            if (res.ok) {
              found.push(url);
              break;
            }
          } catch (_) {
            // ignore errors and continue probing
          }
        }
      }
      if (!cancelled) {
        setResolvedImages(
          found.length > 0 ? found : project.detailImages || []
        );
      }
    };

    probe();
    return () => {
      cancelled = true;
    };
  }, [project.slug, project.detailImages]);

  const paragraphs = project.longDescription
    ? project.longDescription.split(/\n+/).filter(Boolean)
    : [];

  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.imagesCol)}>
          {coverSrc && (
            <img
              src={coverSrc}
              alt={project.title}
              draggable="false"
              {...stylex.props(styles.image)}
            />
          )}
          {resolvedImages.map((src, idx) => (
            <img
              key={`${project.slug}-${idx}`}
              src={src}
              alt={`${project.title} ${idx + 1}`}
              draggable="false"
              {...stylex.props(styles.image)}
            />
          ))}
        </div>
        <div {...stylex.props(styles.textCol)}>
          <div {...stylex.props(styles.title)}>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                {...stylex.props(styles.titleLink)}
              >
                {project.title}
              </a>
            ) : (
              `${project.title}`
            )}{" "}
            {`(${project.year})`}
          </div>
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
    image: PropTypes.string,
  }).isRequired,
};
