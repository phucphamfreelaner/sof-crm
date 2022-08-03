import React from "react";
import * as UI from "@/libs/ui";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import { keys } from "lodash-es";

const TYPES = [
  {
    label: "Cơ hội",
    value: "co_hoi",
  },
  {
    label: "Báo giá",
    value: "bao_gia",
  },
  {
    label: "Hợp đồng",
    value: "hop_dong",
  },
];

const USERS = [
  {
    label: "Tất cả",
    name: "all",
  },
];

interface ICalendarSidebar {
  onAddEvent?: () => any;
  object?: string[];
  onChangeSelect?: (data: any) => any;
}

function CalendarSidebar(props: ICalendarSidebar) {
  const { onAddEvent, object, onChangeSelect } = props;

  const [date, setDate] = React.useState<Date | null>(new Date());

  const [checked, setChecked] = React.useState<any>({});

  const handleChange = (event: any) => {
    const nextState = {
      ...checked,
      [event.target.name]: event.target.checked,
    };

    const nextKeys = keys(nextState).reduce((res, x) => {
      if (nextState?.[x]) res.push(x);
      return res;
    }, []);

    onChangeSelect?.(nextKeys);
    setChecked?.(nextState);
  };

  React.useEffect(() => {
    setChecked(
      object?.reduce((res, x) => {
        res[x] = true;
        return res;
      }, {})
    );
  }, [object]);

  // const handleCheckAll = (event: any) => {
  //   if (event.target.checked) {
  //     onChangeSelect?.(["co_hoi", "bao_gia", "hop_dong"]);
  //   }
  // };

  const isCheckAll = !object;

  return (
    <UI.VStack
      sx={{
        ".PrivatePickersSlideTransition-root": {
          minHeight: "200px",
        },
      }}
      bg="white"
      h="calc(100vh - 40px)"
      alignItems="flex-start"
      w="320px"
    >
      <UI.HStack p="20px" w="100%">
        <UI.Button
          onClick={onAddEvent}
          fullWidth
          size="small"
          variant="contained"
        >
          Thêm mới
        </UI.Button>
      </UI.HStack>
      <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
      <UI.Divider sx={{ width: "100%" }} />
      <UI.CKBox sx={{ with: "100%" }} p="10px">
        <UI.FormControl sx={{ with: "100%" }}>
          <UI.FormLabel component="legend">Phân loại công việc</UI.FormLabel>
          <UI.FormGroup key={JSON.stringify(checked)}>
            <UI.FormControlLabel
              control={<UI.Checkbox name={"all"} />}
              label="Tất cả"
              // onChange={handleCheckAll}
              checked={isCheckAll}
            />
            {TYPES?.map((x, i) => (
              <UI.FormControlLabel
                key={i}
                control={<UI.Checkbox name={x.value} />}
                label={x.label}
                onChange={handleChange}
                checked={checked?.[x.value]}
              />
            ))}
          </UI.FormGroup>
        </UI.FormControl>
      </UI.CKBox>
    </UI.VStack>
  );
}

export default CalendarSidebar;
