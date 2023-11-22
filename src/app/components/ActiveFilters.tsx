import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Chip, Stack, Typography } from "@mui/material";
import { setFilters } from "../store/filtersSlice";
import Utils from "../utils";

function ActiveFilters() {
  const filterState = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <div>
      {(filterState.account ||
        filterState.endDate ||
        filterState.startDate ||
        filterState.industry ||
        filterState.state) && (
        <Stack direction={"column"} spacing={2}>
          <Typography variant="h5">Active Filters:</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {filterState.startDate && filterState.endDate && (
              <Chip
                sx={{ textTransform: "capitalize" }}
                label={
                  Utils.formatDate(filterState.startDate) +
                  " - " +
                  Utils.formatDate(filterState.endDate)
                }
                variant="outlined"
                onDelete={() =>
                  dispatch(
                    setFilters({
                      endDate: undefined,
                      startDate: undefined,
                      account: filterState.account,
                      industry: filterState.industry,
                      state: filterState.state,
                    })
                  )
                }
              />
            )}
            {filterState.account && (
              <Chip
                label={"Account: " + filterState.account}
                variant="outlined"
                onDelete={() =>
                  dispatch(
                    setFilters({
                      endDate: filterState.endDate,
                      startDate: filterState.startDate,
                      account: "",
                      industry: filterState.industry,
                      state: filterState.state,
                    })
                  )
                }
              />
            )}
            {filterState.industry && (
              <Chip
                label={"Industry: " + filterState.industry}
                variant="outlined"
                onDelete={() => {
                  dispatch(
                    setFilters({
                      endDate: filterState.endDate,
                      startDate: filterState.startDate,
                      account: filterState.account,
                      industry: "",
                      state: filterState.state,
                    })
                  );
                }}
              />
            )}
            {filterState.state && (
              <Chip
                label={"State: " + filterState.state}
                variant="outlined"
                onDelete={() =>
                  dispatch(
                    setFilters({
                      endDate: filterState.endDate,
                      startDate: filterState.startDate,
                      account: filterState.account,
                      industry: filterState.industry,
                      state: "",
                    })
                  )
                }
              />
            )}
          </Stack>
        </Stack>
      )}
    </div>
  );
}

export default ActiveFilters;
