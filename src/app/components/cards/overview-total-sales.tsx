import * as Mui from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/People";

function overviewTotalSales(props: any) {
  const { difference, positive = false, sx, value } = props;

  return (
    <Mui.Box>
      <Mui.Card sx={sx}>
        <Mui.CardContent>
          <Mui.Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Mui.Stack spacing={1}>
              <Mui.Typography color="text.secondary" variant="overline">
                Total Customers
              </Mui.Typography>
              <Mui.Typography variant="h4">{value}</Mui.Typography>
            </Mui.Stack>
            <Mui.Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <Mui.SvgIcon>
                <PeopleIcon />
              </Mui.SvgIcon>
            </Mui.Avatar>
          </Mui.Stack>
          {difference && (
            <Mui.Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Mui.Stack alignItems="center" direction="row" spacing={0.5}>
                <Mui.SvgIcon
                  color={positive ? "success" : "error"}
                  fontSize="small"
                >
                  {positive ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </Mui.SvgIcon>
                <Mui.Typography
                  color={positive ? "success.main" : "error.main"}
                  variant="body2"
                >
                  {difference}%
                </Mui.Typography>
              </Mui.Stack>
              <Mui.Typography color="text.secondary" variant="caption">
                Since last month
              </Mui.Typography>
            </Mui.Stack>
          )}
        </Mui.CardContent>
      </Mui.Card>
    </Mui.Box>
  );
}

export default overviewTotalSales;
