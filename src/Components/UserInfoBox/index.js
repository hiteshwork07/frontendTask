import React from "react";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import chartImg from "../../assets/img/chart.png";

const UserInfoBox = ({ info }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div className="card-wrapper">
        <div className="user-info">
          <div className="img-wrapper">
            <Avatar sx={{ bgcolor: "#4692d9", width: 56, height: 56 }}>
              <span style={{ fontSize: 30 }}>
                {info?.fields?.Name?.charAt(0)}
              </span>
            </Avatar>
          </div>
          <div className="detail-wrapper">
            <h2>{info?.fields?.Name}</h2>
            <h4>{info?.fields?.occupation}</h4>
          </div>
        </div>
        <div className="process-info">
          <div className="chart-wrapper">
            <img src={chartImg} alt="chart" />
            <p>Conversions 4/12 - 4/30</p>
          </div>
          <div className="process-details">
            <h3 className="text-orange">20,345</h3>
            <p>impression</p>
            <h3 className="text-blue">1,987</h3>
            <p>conversions</p>
            <h2>$53,123</h2>
          </div>
        </div>
      </div>
    </Grid>
  );
};
export default UserInfoBox;
