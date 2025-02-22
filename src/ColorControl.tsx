import {
  TooltipTrigger,
  Button,
  ColorSwatch,
  Tooltip,
} from "react-aria-components";
import { ColorSelection } from "./ColorsBar";
import { CalendarDate } from "@internationalized/date";
import { Data } from "./Coriander";

type Props = {
  color: ColorSelection;
  tooltipKey: string | null;
  setTooltipKey: (key: string | null) => void;
  date: CalendarDate;
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

export function ColorControl({
  color,
  tooltipKey,
  setTooltipKey,
  date,
  data,
  setData,
}: Props) {
  return (
    <TooltipTrigger
      key={color.name}
      delay={500}
      isOpen={tooltipKey === color.name}
      onOpenChange={(open) => setTooltipKey(open ? color.name : null)}
    >
      <Button
        style={{
          padding: 0,
          margin: 0,
          border: 0,
          background: "none",
        }}
        onPress={() => {
          const dateKey = date.toString();
          const dateData = data.get(dateKey) ?? new Map();
          const count = (dateData.get(color.id) ?? 0) + 1;
          dateData.set(color.id, count);
          const newData = new Map(data);
          newData.set(dateKey, dateData);
          setData(newData);
          setTooltipKey(color.name);
        }}
      >
        <ColorSwatch
          color={color.color}
          style={{
            width: 32,
            height: 32,
            borderRadius: "100%",
          }}
        />
      </Button>
      <Tooltip>{color.name}</Tooltip>
    </TooltipTrigger>
  );
}
