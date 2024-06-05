export const columns = [
  {
    id: "pending",
    title: "Pending",
  },
  {
    id: "inProgress",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

export const getTaskColor = (status: string) => {
  let bgColor;
  switch (status) {
    case "pending":
      bgColor = "red";
      break;
    case "inProgress":
      bgColor = "yellow";
      break;
    case "done":
      bgColor = "blue";
      break;
    default:
      bgColor = "red";
  }
  return bgColor;
};
