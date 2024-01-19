import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Header from "../../utils/Header";

const EventCreate = ({ userId }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [place, setPlace] = useState("");
  
  const handleSubmit = async ({ setSubmitting }) => {
    try {
      setSubmitting(true);
    } catch (error) {
      console.log(error);
    }

    try {
      await fetch('http://localhost:8080/api/event/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name,
          authorId: userId,
          date_time: eventDate + "T" + eventTime,
          place,
         }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
        navigate("/*", { replace: true })
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="СОЗДАНИЕ МЕРОПРИЯТИЯ"
        subtitle="Форма для создания нового мероприятия"
      />
      <Formik
        initialValues={{
          name: "",
          eventDate: "",
          eventTime: "",
          place: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
                onBlur={handleBlur}
                onChange={(event) => setName(event.target.value)}
                value={name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Дата мероприятия"
                onBlur={handleBlur}
                onChange={(event) => setEventDate(event.target.value)}
                value={eventDate}
                name="eventDate"
                error={!!touched.eventDate && !!errors.eventDate}
                helperText={touched.eventDate && errors.eventDate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Время мероприятия"
                onBlur={handleBlur}
                onChange={(event) => setEventTime(event.target.value)}
                value={eventTime}
                name="eventTime"
                error={!!touched.eventTime && !!errors.eventTime}
                helperText={touched.eventTime && errors.eventTime}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Название места"
                onBlur={handleBlur}
                onChange={(event) => setPlace(event.target.value)}
                value={place}
                name="place"
                error={!!touched.place && !!errors.place}
                helperText={touched.place && errors.place}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Создать
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EventCreate;