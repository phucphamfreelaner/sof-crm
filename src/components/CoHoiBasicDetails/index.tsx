import * as UI from "@/libs/ui";

const PropertyList = (props) => {
  const { children } = props;
  return <UI.List disablePadding>{children}</UI.List>;
};

const PropertyListItem = (props) => {
  const { align, children, disableGutters, value, label, ...other } = props;

  return (
    <UI.ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
      {...other}
    >
      <UI.ListItemText
        disableTypography
        primary={
          <UI.Typography
            sx={{ minWidth: align === "vertical" ? "inherit" : 360 }}
            variant="subtitle2"
          >
            {label}
          </UI.Typography>
        }
        secondary={
          <UI.Box
            sx={{
              flex: 1,
              mt: align === "vertical" ? 0.5 : 0,
            }}
          >
            {children || (
              <UI.Typography color="textSecondary" variant="body2">
                {value}
              </UI.Typography>
            )}
          </UI.Box>
        }
        sx={{
          display: "flex",
          flexDirection: align === "vertical" ? "column" : "row",
          my: 0,
        }}
      />
    </UI.ListItem>
  );
};

export const CoHoiBasicDetails = (props) => {
  const { rows } = props;
  const align = true ? "horizontal" : "vertical";

  return (
    <UI.Card>
      <UI.CardHeader title="Chi tiết cơ hội" />
      <UI.Divider />
      <PropertyList>
        {rows.map((row, index) => {
          return (
            <PropertyListItem
              key={index}
              align={align}
              divider
              label={row.label}
              value={row.defaultValues}
            />
          );
        })}
      </PropertyList>
    </UI.Card>
  );
};
