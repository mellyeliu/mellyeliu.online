import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../../styles/tokens.stylex";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MIN_YEAR = 1998;
const MIN_MONTH = 11;

const milestones = [
  { year: 2006, month: 0, label: "first tamagotchi fansite" },
  { year: 2007, month: 0, label: "HTML instruction with jessica" },
  { year: 2016, month: 8, label: "started college" },
  { year: 2020, month: 5, label: "personal website 1.0" },
  { year: 2021, month: 5, label: "graduated!" },
  { year: 2021, month: 6, label: "started at meta" },
  { year: 2021, month: 6, label: "started on messenger" },
  { year: 2022, month: 0, label: "cyberhug collective" },
  { year: 2023, month: 0, label: "digital nostalgia zine" },
  { year: 2023, month: 0, label: "personal website 2.0" },
  { year: 2023, month: 5, label: "dreamland @ internet archive" },
  { year: 2023, month: 8, label: "MOMENTS" },
  { year: 2024, month: 3, label: "started on stylex" },
  { year: 2024, month: 3, label: "ascii storybook" },
  { year: 2024, month: 6, label: "BOY♡GAME" },
  { year: 2025, month: 5, label: "666 stories" },
  { year: 2025, month: 1, label: "love love love" },
];

// Keys are "year-month-day" (month is 0-indexed)
const notes = {
  "2026-4-23": "added a notes feature to this site ^.^",
};

const lifeEras = [
  { start: 1998, end: 1999, label: "before melissa", description: "waiting to exist" },
  { start: 1999, end: 2005, label: "childhood", description: "growing up in new jersey" },
  { start: 2006, end: 2015, label: "internet kid", description: "tamagotchi fansites, HTML tutorials, and learning to build things on the internet" },
  { start: 2016, end: 2020, label: "college", description: "studying computer science, interning, figuring things out" },
  { start: 2021, end: 2022, label: "healing", description: "graduated, started at meta on messenger, learning to be a person again" },
  { start: 2023, end: 2024, label: "creative years", description: "zines, games, interactive fiction, net art — making things because it felt right" },
  { start: 2025, end: 2099, label: "engineering year", description: "web infrastructure, stylex, going deeper on the craft" },
];

const projectData = [
  { title: "Tamagotchi Fansites", start: [2006, 0], end: [2006, 11], url: "https://web.archive.org/web/20070209174817/https://tamaplace.zoomshare.com/" },
  { title: "HTML Instruction", start: [2007, 0], end: [2007, 11], url: "https://web.archive.org/web/20070912023029/http://pages.matmice.com/home/tamahtml/" },
  { title: "Personal Website (1.0)", start: [2020, 5], end: [2020, 5], url: "https://mellyeliu2020.netlify.app/" },
  { title: "Tattoo Art", start: [2021, 5], end: [2021, 5], url: "" },
  { title: "Messenger", start: [2021, 8], end: [2024, 2], url: "https://messenger.com" },
  { title: "CYBERHUG", start: [2022, 0], end: null, url: "https://cyberhug.studio/" },
  { title: "Internet (2 Sides)", start: [2022, 0], end: [2022, 11], url: "" },
  { title: "Digital Nostalgia", start: [2023, 7], end: [2023, 8], url: "https://www.figma.com/proto/QMYDZfrpN2PUJP21R62Sb6/digital-nostalgia?page-id=0%3A1&node-id=201-2&node-type=CANVAS&viewport=617%2C1021%2C0.07&t=6nK9lL1zcp8bszWy-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=201%3A2" },
  { title: "Personal Website (2.0)", start: [2023, 5], end: null, url: "https://github.com/mellyeliu/new-personal-website/" },
  { title: "Dreamland", start: [2023, 8], end: [2023, 8], url: "https://dreamland-demo.netlify.app/play" },
  { title: "Fanfic Zine", start: [2023, 7], end: [2023, 7], url: "https://www.figma.com/proto/QMYDZfrpN2PUJP21R62Sb6/digital-nostalgia?node-id=201-3023&t=7x2gIbOEt1n5qwZx-1&scaling=scale-down&content-scaling=fixed" },
  { title: "MOMENTS", start: [2023, 2], end: [2026, 1], url: "https://m0ments.netlify.app/" },
  { title: "Obsession", start: [2023, 0], end: [2023, 11], url: "https://www.instagram.com/p/CpESuQsploR/?img_index=1" },
  { title: "Digital Love Languages", start: [2023, 0], end: [2023, 11], url: "" },
  { title: "Dimensional Fanfic", start: [2023, 0], end: [2023, 11], url: "https://www.figma.com/file/3iixmn0kM36OZ3ZSyQtyyX/Dimensional-Fanfic" },
  { title: "StyleX", start: [2024, 3], end: [2026, 0], url: "https://stylexjs.com/" },
  { title: "BOY♡GAME", start: [2024, 6], end: [2024, 6], url: "https://www.figma.com/proto/7QemW22jZhpVvq8FENwX4f/BOY%E2%99%A1GAME" },
  { title: "BOY♡GAME (2.0)", start: [2024, 9], end: [2024, 10], url: "https://instagram.com/b0ygame" },
  { title: "Ascii Storybook", start: [2024, 3], end: [2024, 3], url: "https://ascii-storybook.netlify.app/" },
  { title: "666 Stories", start: [2025, 5], end: null, url: "" },
  { title: "On Healing", start: [2024, 5], end: [2024, 5], url: "https://healing-game.netlify.app/" },
  { title: "Serif", start: [2024, 3], end: [2024, 3], url: "https://www.figma.com/proto/xYi0d8tK6IHz2Zbi8xLY1Z/Serif-App?node-id=470-12601" },
  { title: "Object Anthropomorphism", start: [2024, 2], end: [2024, 2], url: "https://archiveofourown.org/works/53351767" },
  { title: "Parasocial Relationships", start: [2024, 0], end: [2024, 11], url: "https://www.figma.com/design/e2UOBTAXopSigUwJToke4c/parasocial-relationships" },
  { title: "( DISSOCIATION )", start: [2024, 0], end: [2024, 11], url: "https://www.figma.com/file/wtlzG9LI65YerdnUCTavG5/dissociation-(Copy)" },
  { title: "Love Love Love", start: [2025, 1], end: [2025, 1], url: "https://www.figma.com/proto/hkZ1ppBFS9HaALSesJZl07/valentines" },
  { title: "Childhood Convos", start: [2025, 1], end: [2025, 1], url: "https://www.figma.com/design/cCsqk7MUBsIxy3M1ZiEEDf/childhood" },
];

function getMilestonesForMonth(year, month) {
  return milestones.filter((m) => m.year === year && m.month === month);
}


function getLifeEra(year) {
  for (let i = lifeEras.length - 1; i >= 0; i--) {
    if (year >= lifeEras[i].start && year <= lifeEras[i].end) {
      return lifeEras[i];
    }
  }
  return null;
}

function getActiveProjects(year, month) {
  const ym = year * 12 + month;
  return projectData.filter((p) => {
    const startYM = p.start[0] * 12 + p.start[1];
    const endYM = p.end ? p.end[0] * 12 + p.end[1] : 9999;
    return ym >= startYM && ym <= endYM;
  });
}


function clampDate(year, month) {
  if (year < MIN_YEAR || (year === MIN_YEAR && month < MIN_MONTH)) {
    return { year: MIN_YEAR, month: MIN_MONTH };
  }
  return { year, month };
}

const GRID_HEIGHT = 234;

const styles = stylex.create({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999999,
  },
  container: {
    position: "fixed",
    bottom: 62,
    right: 0,
    width: 280,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: colors.black,
    fontFamily: fonts.serif,
    zIndex: 1000000000,
    userSelect: "none",
    boxShadow: "2px -2px 8px rgba(0, 0, 0, 0.15)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: colors.bgGray,
    borderBottomWidth: 0.5,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  navGroup: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 500,
    fontStyle: "italic",
    letterSpacing: 0.5,
    cursor: "pointer",
    color: colors.black,
    fontFamily: fonts.serif,
  },
  navButton: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    fontFamily: fonts.serif,
    color: colors.black,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.bgHover,
    },
  },
  dayNamesRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    paddingTop: 8,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: colors.bgGray,
  },
  dayName: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: 0.3,
    fontFamily: fonts.serif,
  },
  gridWrapper: {
    height: GRID_HEIGHT,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    width: "100%",
  },
  day: {
    textAlign: "center",
    fontSize: 13,
    paddingTop: 3,
    paddingBottom: 0,
    cursor: "pointer",
    position: "relative",
    color: colors.black,
    fontFamily: fonts.helvetica,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dayOther: {
    cursor: "default",
  },
  dayInner: {
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    zIndex: 1,
  },
  dayActiveInner: {
    color: colors.white,
  },
  activeStar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -48%)",
    fontSize: 38,
    color: colors.black,
    lineHeight: 1,
    pointerEvents: "none",
  },
  dayOtherMonth: {
    color: colors.mediumGray,
  },
  dayMilestone: {
    fontWeight: 600,
    color: colors.accentBlue,
  },
  todayDot: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: colors.iconRed,
  },
  noteStar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -48%)",
    fontSize: 38,
    color: "transparent",
    WebkitTextStroke: "0.5px black",
    lineHeight: 1,
    pointerEvents: "none",
  },
  infoSection: {
    borderTopWidth: 0.5,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 0, 0, 0.15)",
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: colors.bgGray,
  },
  infoDate: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: 0.3,
    paddingBottom: 4,
  },
  infoEra: {
    fontSize: 13,
    fontStyle: "italic",
    color: colors.black,
    paddingBottom: 2,
  },
  infoDesc: {
    fontSize: 12,
    color: colors.gray,
    lineHeight: "1.4",
    paddingTop: 2,
    paddingBottom: 2,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.mediumGray,
    letterSpacing: 0.5,
    paddingTop: 6,
    paddingBottom: 3,
    textTransform: "uppercase",
  },
  infoItem: {
    fontSize: 13,
    fontStyle: "italic",
    letterSpacing: 0.2,
    color: colors.black,
    paddingTop: 1,
    paddingBottom: 1,
  },
  infoProjects: {
    fontSize: 12,
    lineHeight: "1.5",
    paddingTop: 2,
    paddingBottom: 2,
  },
  noteHeader: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.black,
    letterSpacing: 0.3,
    paddingTop: 8,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: colors.bgGray,
    borderTopWidth: 0.5,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 0, 0, 0.15)",
    borderBottomWidth: 0.5,
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  noteBody: {
    fontSize: 12,
    fontFamily: fonts.helvetica,
    color: colors.black,
    lineHeight: "1.5",
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: colors.white,
  },
  projectLink: {
    color: colors.linkPurple,
    textDecoration: "underline",
    cursor: "pointer",
  },
  projectPlain: {
    color: colors.black,
  },
  pickerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 14,
    paddingRight: 14,
  },
  yearInputRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingBottom: 12,
  },
  yearInput: {
    width: 70,
    textAlign: "center",
    fontFamily: fonts.serif,
    fontSize: 16,
    fontWeight: 500,
    border: "none",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.black,
    backgroundColor: "transparent",
    color: colors.black,
    outline: "none",
    paddingTop: 2,
    paddingBottom: 2,
  },
  yearNavButton: {
    background: "none",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    fontFamily: fonts.serif,
    color: colors.black,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.bgGray,
    },
  },
  monthGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 4,
  },
  monthCell: {
    textAlign: "center",
    fontSize: 13,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: "pointer",
    color: colors.black,
    backgroundColor: {
      default: "transparent",
      ":hover": colors.bgGray,
    },
  },
  monthCellCurrent: {
    fontWeight: 700,
    backgroundColor: {
      default: colors.bgGray,
      ":hover": colors.bgHover,
    },
  },
});

const Calendar = ({ onClose }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(today.getFullYear());
  const [showEraInfo, setShowEraInfo] = useState(false);

  const navigate = (year, month) => {
    const clamped = clampDate(year, month);
    setViewYear(clamped.year);
    setViewMonth(clamped.month);
    setShowEraInfo(false);
    setSelectedDay(null);
  };

  const goBackMonth = () => {
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    navigate(y, m);
  };

  const goForwardMonth = () => {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    navigate(y, m);
  };

  const goBackYear = () => navigate(viewYear - 1, viewMonth);
  const goForwardYear = () => navigate(viewYear + 1, viewMonth);

  const selectMonthFromPicker = (month) => {
    const clamped = clampDate(pickerYear, month);
    setViewYear(clamped.year);
    setViewMonth(clamped.month);
    setShowPicker(false);
    setShowEraInfo(false);
  };

  const handleHeaderClick = () => {
    if (showPicker) {
      setShowPicker(false);
    } else {
      setShowEraInfo(!showEraInfo);
    }
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false });
  }
  const rows = Math.ceil(cells.length / 7);
  const totalCells = rows * 7;
  while (cells.length < totalCells) {
    cells.push({ day: cells.length - (firstDay + daysInMonth) + 1, otherMonth: true });
  }

  const monthMilestones = getMilestonesForMonth(viewYear, viewMonth);
  const era = getLifeEra(viewYear);

  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const isToday = (day) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate();

  const getNote = (year, month, day) => {
    const key = `${year}-${month}-${day}`;
    return notes[key] || null;
  };

  const hasNote = (year, month, day) => getNote(year, month, day) != null;

  const showDayInfo = selectedDay != null && getNote(viewYear, viewMonth, selectedDay);
  const showDefaultMilestones = !showEraInfo && !showDayInfo && monthMilestones.length > 0;

  return ReactDOM.createPortal(
    <>
      <div {...stylex.props(styles.overlay)} onClick={onClose} />
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.navGroup)}>
            <button {...stylex.props(styles.navButton)} onClick={showPicker ? () => setPickerYear(pickerYear - 10) : goBackYear}>
              ‹‹
            </button>
            <button {...stylex.props(styles.navButton)} onClick={showPicker ? () => setPickerYear(pickerYear - 1) : goBackMonth}>
              ‹
            </button>
          </div>
          <span
            {...stylex.props(styles.headerTitle)}
            onClick={handleHeaderClick}
          >
            {showPicker ? pickerYear : `${MONTH_NAMES[viewMonth]} ${viewYear}`}
          </span>
          <div {...stylex.props(styles.navGroup)}>
            <button {...stylex.props(styles.navButton)} onClick={showPicker ? () => setPickerYear(pickerYear + 1) : goForwardMonth}>
              ›
            </button>
            <button {...stylex.props(styles.navButton)} onClick={showPicker ? () => setPickerYear(pickerYear + 10) : goForwardYear}>
              ››
            </button>
          </div>
        </div>

        {showPicker ? (
          <div {...stylex.props(styles.pickerContainer)}>
            <div {...stylex.props(styles.yearInputRow)}>
              <input
                {...stylex.props(styles.yearInput)}
                type="number"
                value={pickerYear}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val)) setPickerYear(val);
                }}
              />
            </div>
            <div {...stylex.props(styles.monthGrid)}>
              {MONTH_SHORT.map((name, i) => (
                <div
                  key={name}
                  {...stylex.props(
                    styles.monthCell,
                    pickerYear === viewYear && i === viewMonth && styles.monthCellCurrent
                  )}
                  onClick={() => selectMonthFromPicker(i)}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div {...stylex.props(styles.dayNamesRow)}>
              {DAY_NAMES.map((name) => (
                <div key={name} {...stylex.props(styles.dayName)}>
                  {name}
                </div>
              ))}
            </div>
            <div {...stylex.props(styles.gridWrapper)}>
              <div {...stylex.props(styles.grid)}>
                {cells.map((cell, i) => (
                  <div
                    key={i}
                    {...stylex.props(
                      styles.day,
                      cell.otherMonth && styles.dayOtherMonth
                    )}
                    onClick={
                      cell.otherMonth
                        ? undefined
                        : () => {
                            setShowEraInfo(false);
                            setSelectedDay(cell.day);
                          }
                    }
                  >
                    <div
                      {...stylex.props(
                        styles.dayInner,
                        !cell.otherMonth && selectedDay === cell.day && styles.dayActiveInner
                      )}
                    >
                      {cell.day}
                    </div>
                    {!cell.otherMonth && selectedDay === cell.day && (
                      <span {...stylex.props(styles.activeStar)}>★</span>
                    )}
                    {!cell.otherMonth && hasNote(viewYear, viewMonth, cell.day) && selectedDay !== cell.day && (
                      <span {...stylex.props(styles.noteStar)}>★</span>
                    )}
                    {!cell.otherMonth && isToday(cell.day) && selectedDay !== cell.day && (
                      <div {...stylex.props(styles.todayDot)} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {showEraInfo && era && (
              <div {...stylex.props(styles.infoSection)}>
                <div {...stylex.props(styles.infoDate)}>
                  {viewYear} · {era.label}
                </div>
                <div {...stylex.props(styles.infoDesc)}>
                  {era.description}
                </div>
                {monthMilestones.length > 0 && (
                  <div {...stylex.props(styles.infoItem)}>
                    {monthMilestones.map((m) => m.label).join(", ")}
                  </div>
                )}
                {getActiveProjects(viewYear, viewMonth).length > 0 && (
                  <>
                    <div {...stylex.props(styles.infoLabel)}>projects</div>
                    <div {...stylex.props(styles.infoProjects)}>
                      {getActiveProjects(viewYear, viewMonth).map((p, i, arr) => (
                        <React.Fragment key={i}>
                          {p.url ? (
                            <a href={p.url} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.projectLink)}>{p.title}</a>
                          ) : (
                            <span {...stylex.props(styles.projectPlain)}>{p.title}</span>
                          )}
                          {i < arr.length - 1 ? ", " : ""}
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {showDayInfo && getNote(viewYear, viewMonth, selectedDay) && (
              <>
                <div {...stylex.props(styles.noteHeader)}>
                  {MONTH_NAMES[viewMonth]} {selectedDay}, {viewYear}
                </div>
                <div {...stylex.props(styles.noteBody)}>
                  {getNote(viewYear, viewMonth, selectedDay)}
                </div>
              </>
            )}

            {showDefaultMilestones && (
              <div {...stylex.props(styles.infoSection)}>
                <div {...stylex.props(styles.infoItem)}>
                  {monthMilestones.map((m) => m.label).join(", ")}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>,
    document.body
  );
};

export default Calendar;
