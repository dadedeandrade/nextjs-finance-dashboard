"use client";
import { format } from "date-fns";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SeverityPill } from "../../components/SeverityPill";
import { Scrollbar } from "../../components/Scrollbar";
import useTransactions from "@/app/hooks/useTransactions";

const statusMap = {
  deposit: "success",
  withdraw: "error",
};

export const PendingTransactions = () => {
  const { futureTransactions } = useTransactions();
  console.log(futureTransactions);

  return (
    <Card>
      <CardHeader title="Pending Transactions" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Date</TableCell>
                <TableCell sortDirection="desc">Transaction Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {futureTransactions.length <= 0 ? (
                <TableRow hover>
                  <TableCell
                    width={"100%"}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                futureTransactions.map((order) => {
                  var date = new Date(Math.round(Number(order.date)));

                  const createdAt =
                    date.getUTCDate() +
                    "-" +
                    (date.getUTCMonth() + 1) +
                    "-" +
                    date.getUTCFullYear();

                  return (
                    <TableRow hover key={order.date}>
                      <TableCell>{order.account}</TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[order.transaction_type]}>
                          {order.transaction_type}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowForwardIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
        ></Button>
      </CardActions>
    </Card>
  );
};

export default PendingTransactions;
