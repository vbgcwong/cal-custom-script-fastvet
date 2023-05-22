import { Request, Response } from "express";
import { EnvConstants } from "../constants/env-constants";

export const healthcheck = (_: Request, res: Response) => {
  const uptimeSeconds = process.uptime();
  const secondsInDay = 86400;
  const secondsInHour = 3600;
  const secondsInMinute = 60;

  const activeDays = Math.floor(uptimeSeconds / secondsInDay);
  const activeHours = Math.floor((uptimeSeconds % secondsInDay) / secondsInHour);
  const activeMinutes = Math.floor((uptimeSeconds % secondsInHour) / secondsInMinute);
  const activeSeconds = Math.floor(uptimeSeconds % secondsInMinute);

  const now = new Date();
  const pacificTime = now.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles"
  });

  const currentDate = pacificTime.split(",")[0];
  const currentTime = pacificTime.split(",")[1];

  res.status(200).send(`
  <h1>Exam builder health check (${EnvConstants.APP_ENV})</h1>
  <br/>
  <h3>Uptime: <span style="font-weight: normal">${activeDays}d ${activeHours}h ${activeMinutes}m ${activeSeconds}s</span></h3>
  <h3>Message: <span style="font-weight: normal">Ok</span></h3>
  <h3>Current date: <span style="font-weight: normal">${currentDate}</span></h3>
  <h3>Current time: <span style="font-weight: normal">${currentTime}</span></h3>
  `);
};
