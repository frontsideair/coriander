import { CalendarDate } from "@internationalized/date";
import { CalendarCell, ColorSwatch } from "react-aria-components";

export type Props = {
  date: CalendarDate;
  dateColors: [string, number][];
};

export function CalendarCellControls({ date, dateColors }: Props) {
  return (
    <CalendarCell date={date}>
      {({ formattedDate, isSelected }) => (
        <div
          style={{
            backgroundColor: isSelected ? "black" : undefined,
            padding: 8,
            borderRadius: 4,
          }}
        >
          <span style={{ fontSize: 24 }}>{formattedDate}</span>
          <div
            style={{
              display: "flex",
              gap: 4,
              width: 76,
              height: 16,
            }}
          >
            {dateColors.map(([color, count]) => (
              <div key={color} style={{ position: "relative" }}>
                <ColorSwatch
                  color={color}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    fontSize: 12,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontSize: 10,
                    color: "white",
                    mixBlendMode: "difference",
                  }}
                >
                  {count === 1 ? "" : count}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CalendarCell>
  );
}
