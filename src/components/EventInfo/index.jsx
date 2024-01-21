import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../utils/Header";
import formatDate from "../../utils/FormatDate";
import axios from '../../api/axios';

const EventInfo = ({userId}) => {
  const [eventData, setEventData] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  let eventId = location.state.eventId;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/event/${eventId}`);
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const leave = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/event/${eventId}/${userId}/leave`);
      navigate("/", { replace: true })
    } catch (error) {
      console.error('Ошибка при попытке покинуть мероприятие: ', error.message);
    }
  }

  return (
    <Box m="20px">
      <Header title="ИНФОРМАЦИЯ О МЕРОПРИЯТИИ" />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Название мероприятия"
          value={eventData.name}
          name="eventName"
          focused={true}
          readOnly={true}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Дата и время"
          value={formatDate(eventData.date_time)}
          name="eventDate"
          readOnly={true}
          focused={true}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          multiline
          readOnly
          variant="filled"
          type="text"
          focused={true}
          label="Участники мероприятия"
          value={eventData.participants?.map((user) => user.username).join("\n")}
          name="participants"
          sx={{ gridRow: "span 1" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Название места"
          value={eventData.place}
          name="venueName"
          readOnly={true}
          focused={true}
          sx={{ gridColumn: "span 3" }}
        />
      </Box>
      <Button
        style={{ backgroundColor: "#4cceac", color: "#141b2d", marginTop: 10 }}
        onClick={() => leave()}
      >
        Покинуть мероприятие
      </Button>
    </Box>
  );
};

export default EventInfo;