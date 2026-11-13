import React, { useState } from "react";
import ReactDOM from "react-dom";
import Quote from "./Quote";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "../../styles/tokens.stylex";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

const MIN_YEAR = 1998;
const MIN_MONTH = 11;

// Keys are "year-month-day" (month is 0-indexed)
const notes = {
  "2026-4-23": "added a notes feature to this site ^.^",
};

const getNote = (year, month, day) => notes[`${year}-${month}-${day}`] || null;

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
    bottom: 62.5,
    right: 0,
    width: 280,
    maxHeight: "calc(100dvh - 80px)",
    overflowY: "auto",
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
    fontSize: 18,
    fontWeight: 500,
    fontStyle: "italic",
    letterSpacing: 0.5,
    cursor: "default",
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
    fontWeight: 400,
    fontStyle: "italic",
    color: colors.black,
    letterSpacing: 0.3,
    fontFamily: fonts.helvetica,
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






  noteBody: {
    borderTopWidth: 0.5,
    borderTopStyle: "solid",
    borderTopColor: "rgba(0, 0, 0, 0.15)",
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

});

// Day cells for a month, padded with days from the neighbouring months so
// every week row is full.
const getMonthCells = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, otherMonth: false });
  }
  for (let day = 1; cells.length % 7 !== 0; day++) {
    cells.push({ day, otherMonth: true });
  }
  return cells;
};

const Calendar = ({ onClose }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // Month arithmetic via Date handles year wrap-around (e.g. month -1).
  const navigate = (year, month) => {
    const date = new Date(year, month, 1);
    const clamped = clampDate(date.getFullYear(), date.getMonth());
    setViewYear(clamped.year);
    setViewMonth(clamped.month);
    setSelectedDay(null);
  };

  const cells = getMonthCells(viewYear, viewMonth);
  const isToday = (day) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate();
  const selectedNote = selectedDay != null && getNote(viewYear, viewMonth, selectedDay);

  return ReactDOM.createPortal(
    <>
      <div {...stylex.props(styles.overlay)} onClick={onClose} />
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.navGroup)}>
            <button {...stylex.props(styles.navButton)} onClick={() => navigate(viewYear - 1, viewMonth)}>
              ‹‹
            </button>
            <button {...stylex.props(styles.navButton)} onClick={() => navigate(viewYear, viewMonth - 1)}>
              ‹
            </button>
          </div>
          <span {...stylex.props(styles.headerTitle)}>
            {`${MONTH_NAMES[viewMonth]} ${viewYear}`}
          </span>
          <div {...stylex.props(styles.navGroup)}>
            <button {...stylex.props(styles.navButton)} onClick={() => navigate(viewYear, viewMonth + 1)}>
              ›
            </button>
            <button {...stylex.props(styles.navButton)} onClick={() => navigate(viewYear + 1, viewMonth)}>
              ››
            </button>
          </div>
        </div>

        <div {...stylex.props(styles.dayNamesRow)}>
          {DAY_NAMES.map((name, index) => (
            <div key={index} {...stylex.props(styles.dayName)}>
              {name}
            </div>
          ))}
        </div>
        <div {...stylex.props(styles.gridWrapper)}>
          <div {...stylex.props(styles.grid)}>
            {cells.map((cell, i) => {
              const inMonth = !cell.otherMonth;
              const isSelected = inMonth && selectedDay === cell.day;
              return (
                <div
                  key={i}
                  {...stylex.props(styles.day, cell.otherMonth && styles.dayOtherMonth)}
                  onClick={inMonth ? () => setSelectedDay(cell.day) : undefined}
                >
                  <div {...stylex.props(styles.dayInner, isSelected && styles.dayActiveInner)}>
                    {cell.day}
                  </div>
                  {isSelected && <span {...stylex.props(styles.activeStar)}>★</span>}
                  {inMonth && !isSelected && getNote(viewYear, viewMonth, cell.day) && (
                    <span {...stylex.props(styles.noteStar)}>★</span>
                  )}
                  {inMonth && !isSelected && isToday(cell.day) && (
                    <div {...stylex.props(styles.todayDot)} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {selectedNote ? (
          <div {...stylex.props(styles.noteBody)}>{selectedNote}</div>
        ) : (
          <Quote />
        )}
      </div>
    </>,
    document.body
  );
};

export default Calendar;
