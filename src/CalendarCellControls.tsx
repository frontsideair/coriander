import { CalendarDate } from "@internationalized/date";
import { CalendarCell, ColorSwatch } from "react-aria-components";
import { ColorSelection } from "./ColorsBar";

export type Props = {
  date: CalendarDate;
  dateColors: [string, number][];
  colors: ColorSelection[];
};

export function CalendarCellControls({ date, dateColors, colors }: Props) {
  return (
    <CalendarCell date={date}>
      {({ formattedDate, isSelected }) => (
        <div
          style={{
            backgroundColor: isSelected
              ? "light-dark(ghostwhite, black)"
              : undefined,
            borderRadius: 4,
          }}
        >
          <span style={{ fontSize: 24 }}>{formattedDate}</span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              width: 46,
              minHeight: 30,
            }}
          >
            {dateColors.map(([colorId, count]) => (
              <div key={colorId} style={{ position: "relative" }}>
                <ColorSwatch
                  color={colors.find((color) => color.id === colorId)?.color}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    fontSize: 12,
                    filter: "brightness(0.75)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    fontSize: 10,
                    color: "white",
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
