import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardRequest } from "../../redux/actions/Action";
import { Container } from "@mui/system";
import "./styles.scss";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import isBetween from "dayjs/plugin/isBetween";
import UserInfoBox from "../../Components/UserInfoBox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InfiniteScroll from "react-infinite-scroll-component";

dayjs.extend(isBetween);

export const Dashboard = () => {
  const {
    data: { loading, records = [], offset },
  } = useSelector(({ dashboard }) => dashboard);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleFetchMoreData = () => {
    if (offset)
      dispatch(dashboardRequest({ maxRecords: 500, pageSize: 20, offset }));
  };

  useEffect(() => {
    const updateData = records.filter(
      (v) =>
        v?.fields?.Name?.toLowerCase()?.includes(search.toLowerCase()) ||
        v?.fields?.occupation?.toLowerCase()?.includes(search.toLowerCase())
    );
    setData(updateData);
  }, [search]);

  useEffect(() => {
    switch (sort) {
      case "ascending":
        return setData(
          records?.sort((a, b) =>
            a.fields?.Name > b.fields?.Name
              ? -1
              : b.fields?.Name > a.fields?.Name
              ? 1
              : 0
          )
        );
      case "descending":
        return setData(
          records?.sort((a, b) =>
            a.fields?.Name > b.fields?.Name
              ? 1
              : b.fields?.Name > a.fields?.Name
              ? -1
              : 0
          )
        );
      default:
        return records;
    }
  }, [sort]);

  useEffect(() => {
    dispatch(dashboardRequest({ maxRecords: 500, pageSize: 20 }));
  }, []);

  useEffect(() => {
    setData(records);
  }, [records]);

  return (
    <Container maxWidth="lg" className="page-top-space">
      {loading ? (
        <div style={{ textAlign: "center", marginTop: 150, width: "100%" }}>
          <CircularProgress style={{ color: "#fff" }} />
        </div>
      ) : (
        <>
          <div className="searchbar-wrapper">
            <TextField
              id="standard-basic"
              label="Search"
              value={search}
              onChange={({ target: { value } }) => setSearch(value)}
            />
            <FormControl style={{ width: 190, marginLeft: 15 }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="sort"
                id="sort"
                value={sort}
                label="Sort"
                onChange={handleChange}
              >
                <MenuItem value="ascending">Ascending order</MenuItem>
                <MenuItem value="descending">Descending order</MenuItem>
              </Select>
            </FormControl>
          </div>
          <InfiniteScroll
            dataLength={data.length}
            next={handleFetchMoreData}
            hasMore={!!offset}
            loader={
              <h4 style={{ textAlign: "center", color: "#fff", fontSize: 24 }}>
                Loading...
              </h4>
            }
          >
            <Grid container spacing={5} className="filter-action-wrapper">
              {data.map((data) => (
                <UserInfoBox key={data.id} info={data} />
              ))}
            </Grid>
          </InfiniteScroll>
        </>
      )}
    </Container>
  );
};
