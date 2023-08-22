import type { NextApiRequest, NextApiResponse } from "next";
import { stdout } from "process";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  console.log("Cron job ran!");
  stdout.write("Cron job ran!");
  res.status(200).end("Hello Cron!");
}
