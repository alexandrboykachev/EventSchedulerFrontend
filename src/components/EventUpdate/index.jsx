import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import Header from "../../utils/Header";
import axios from '../../api/axios';

const EventUpdate = () => {
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [place, setPlace] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  let eventId = location.state.eventId;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/event/${eventId}`);
        const data = await response.json();
        setName(data.name);
        setEventDate(data.date_time.split("T")[0]);
        setEventTime(data.date_time.split("T")[1]);
        setPlace(data.place);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:8080/api/event/update', {
        id: eventId,
        name: name,
        date_time: eventDate + "T" + eventTime,
        place: place,
      });
      navigate("/*", { replace: true })

    } catch (error) {
      console.error('Ошибка при обновлении мероприятия:', error);
    }
  };

  return (
    <Box m="20px">
      <Header title="РЕДАКТИРОВАНИЕ МЕРОПРИЯТИЯ" />
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
          onChange={(event) => setName(event.target.value)}
          name="eventName"
          focused={true}
          value={name}
          sx={{ gridColumn: "span 2" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="date"
          label="Дата"
          onChange={(event) => setEventDate(event.target.value)}
          name="eventDate"
          focused={true}
          value={eventDate}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="time"
          label="Время"
          onChange={(event) => setEventTime(event.target.value)}
          value={eventTime}
          name="eventDate"
          focused={true}
          sx={{ gridColumn: "span 1" }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Название места"
          onChange={(event) => setPlace(event.target.value)}
          value={place}
          name="venueName"
          focused={true}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
      <Button
        style={{ backgroundColor: "#4cceac", color: "#141b2d", marginTop: 10 }}
        onClick={() => handleUpdate()}
      >
        Сохранить изменения
      </Button>
    </Box>
  );
};

export default EventUpdate;