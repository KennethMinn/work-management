import { useAuth } from "../../../hooks/auth/useAuth";
import CalendarList from "../features/CalendarList";

const CalendarListing = () => {
  const { auth } = useAuth();
  console.log(auth);
  return <CalendarList />;
};

export default CalendarListing;
