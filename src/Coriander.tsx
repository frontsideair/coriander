import { useState } from "react";
import "./Coriander.css";
import { MonthView } from "./MonthView";
import { ColorsBar, ColorSelection } from "./ColorsBar";
import { getLocalTimeZone, today } from "@internationalized/date";
import useLocalStorage from "use-local-storage-state";
import SuperJSON from "superjson";
import { Button } from "react-aria-components";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
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
      <div style={{ display: "flex", gap: 4 }}>
        <Button
          onPress={() => {
            setColors([]);
            setData(new Map());
          }}
        >
          Clear all data
        </Button>
        <Button
          onPress={() => {
            const blob = new Blob([SuperJSON.stringify({ data, colors })], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "coriander-data.json";
            a.click();
          }}
        >
          Download data
        </Button>
      </div>
    </div>
  );
}
