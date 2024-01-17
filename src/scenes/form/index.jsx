import React, {useState} from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";



const EventForm = ({ events, onCreateEvent, onJoinEvent }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [address, setAddress] = useState("");
  
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const eventData = {
      eventName,
      eventDate,
      eventTime,
      venueName,
      address,
    };

    try {
      const event = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({eventData}),
      });

      if (event.status === 201) {
        alert("User created successfully");
      } else {
        alert("Error creating event");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="СОЗДАНИЕ МЕРОПРИЯТИЯ"
        subtitle="Создание нового мероприятия"
      />

      <Formik
        initialValues={{
          eventName,
          eventDate,
          eventTime,
          venueName,
          address,
          joinEvent: false,
          eventId: null,
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Название мероприятия"
                onBlur={handleBlur}
                onChange={(event) => setEventName(event.target.value)}
                value={eventName}
                name="eventName"
                error={!!touched.eventName && !!errors.eventName}
                helperText={touched.eventName && errors.eventName}
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
                onChange={(event) => setVenueName(event.target.value)}
                value={venueName}
                name="venueName"
                error={!!touched.venueName && !!errors.venueName}
                helperText={touched.venueName && errors.venueName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Адрес"
                onBlur={handleBlur}
                onChange={(event) => setAddress(event.target.value)}
                value={address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
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

export default EventForm;