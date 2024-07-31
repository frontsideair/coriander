import { useState } from "react";
import "./Coriander.css";
import { MonthView } from "./MonthView";
import { ColorsBar, ColorSelection } from "./ColorsBar";
import { getLocalTimeZone, today } from "@internationalized/date";
import useLocalStorage from "use-local-storage-state";
import SuperJSON from "superjson";

const initialColors: ColorSelection[] = [];

export type Data = Map<string, Map<string, number>>;

const initialData: Data = new Map();

export function Coriander() {
  const [colors, setColors] = useLocalStorage<ColorSelection[]>("colors", {
    defaultValue: initialColors,
    serializer: SuperJSON,
  });
  const [data, setData] = useLocalStorage("data", {
    defaultValue: initialData,
    serializer: SuperJSON,
  });
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));

  return (
    <div>
      <ColorsBar
        colors={colors}
        setColors={setColors}
        date={selectedDate}
        data={data}
        setData={setData}
      />
      <MonthView
        data={data}
        date={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}
