import { Calendar, Button, Heading, CalendarGrid } from "react-aria-components";
import { CalendarCellControls } from "./CalendarCellControls";
import { CalendarDate } from "@internationalized/date";
import { Data } from "./Coriander";

type Props = {
  data: Data;
  date: CalendarDate;
  setSelectedDate: (value: CalendarDate) => void;
};

export function MonthView({ data, date, setSelectedDate }: Props) {
  return (
    <Calendar aria-label="Month view" value={date} onChange={setSelectedDate}>
      <header
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        <Button slot="previous">◀</Button>
        <Heading />
        <Button slot="next">▶</Button>
      </header>
      <CalendarGrid>
        {(date) => {
          const dateColors = [...(data.get(date.toString()) ?? [])];
          return <CalendarCellControls date={date} dateColors={dateColors} />;
        }}
      </CalendarGrid>
    </Calendar>
  );
}
