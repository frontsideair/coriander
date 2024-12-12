import {
  Button,
  Popover,
  ColorSwatch,
  GridListItem,
  MenuTrigger,
  Menu,
  MenuItem,
  ToggleButton,
} from "react-aria-components";
import { produce } from "immer";
import { ColorSelection } from "./ColorsBar";
import { Data } from "./Coriander";

type Props = {
  color: ColorSelection;
  setColors: React.Dispatch<React.SetStateAction<ColorSelection[]>>;
  setModalColor: React.Dispatch<React.SetStateAction<boolean | ColorSelection>>;
  setData: React.Dispatch<React.SetStateAction<Data>>;
};

export function ColorGridListItem({
  color,
  setColors,
  setModalColor,
  setData,
}: Props) {
  return (
    <GridListItem
      textValue={color.name}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
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
      <div style={{ flexGrow: 1, textAlign: "left" }}>{color.name}</div>
      <ToggleButton
        isSelected={color.isFavorite !== false}
        onChange={(isSelected) => {
          setColors(
            produce((draft) => {
              const currentColor = draft.find(
                ({ name }) => name === color.name
              );
              if (currentColor) {
                currentColor.isFavorite = isSelected;
              }
            })
          );
        }}
      >
        {({ isSelected }) => (isSelected ? "❤️" : "🤍")}
      </ToggleButton>
      <MenuTrigger>
        <Button aria-label="Menu">☰</Button>
        <Popover>
          <Menu
            style={{
              backgroundColor: "light-dark(white, black)",
              border: "1px solid light-dark(black, white)",
            }}
          >
            <MenuItem onAction={() => setModalColor(color)}>Edit</MenuItem>
            <MenuItem
              onAction={() => {
                setColors((colors) =>
                  colors.filter(({ name }) => name !== color.name)
                );
                setData(
                  (data) =>
                    new Map(
                      [...data.entries()].map(([key, value]) => {
                        return [
                          key,
                          new Map(
                            [...value.entries()].filter(
                              ([colorKey]) => colorKey !== color.color
                            )
                          ),
                        ];
                      })
                    )
                );
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </GridListItem>
  );
}
