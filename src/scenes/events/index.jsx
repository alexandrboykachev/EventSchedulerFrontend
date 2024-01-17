import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Events = ({events}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const navigate = useNavigate();

  events = [
    {
      id: 1,
      eventName: "Bar",
      eventDate: "2023-08-01",
      eventTime: "10:00",
      venueName: "Паб",
      address: "Санкт-Петербург",
    },
    {
      id: 2,
      eventName: "Walk",
      eventDate: "2023-10-02",
      eventTime: "12:00",
      venueName: "Улица",
      address: "Мск",
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="БЛИЖАЙШИЕ МЕРОПРИЯТИЯ" subtitle={"Здесь представлен список мероприятий пользователя"}/>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* EVENTS */}
        {events.map((event) => (
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            key={event.id}
            variant="h3"
            style={{ height: "100%", width: "100%" }}
          >
            <Typography variant="h3" onClick={() => navigate('/eventinfo', { replace: true })}>{event.eventName}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Events;

