import { SERVER_URI } from "./constants";
import { Pr } from "./types";

export const toDate = (dateString: string) => {

var dateParts = dateString.split("/");

// month is 0-based, that's why we need dataParts[1] - 1
//@ts-ignore
return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
}

export async function fetchPrs() {
  const res = await fetch(`${SERVER_URI}/prs`);
  const prs: Pr[] = await res.json();
}
