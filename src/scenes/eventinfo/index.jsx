import React, {useState, useEffect} from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";



const EventForm = ({ eventId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [eventData, setEventData] = useState(null);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const currentUser = { userId: '...' };
    const fetchEventData = async () => {
      try {
        const response = await fetch(`/api/event/${eventId}`);
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
    if (eventData && currentUser && eventData.creator === currentUser.userId) {
      setIsCreator(true);
    }
  }, [eventId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      eventName: eventData ? eventData.name : '',
      eventDate: eventData ? eventData.date : '',
    },
    onSubmit: (values) => {
      
      fetch(`/api/event/update/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Успешно обновлено:', data);
        })
        .catch(error => {
          console.error('Ошибка при обновлении данных:', error);
        });
    },
  });

  return (
    <Box m="20px">
      <Header title="ИНФОРМАЦИЯ О МЕРОПРИЯТИИ" />
      <form onSubmit={formik.handleSubmit}>
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
            value={formik.values.eventName}
            name="eventName"
            readOnly={true}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Дата мероприятия"
            value={formik.values.eventDate}
            name="eventDate"
            readOnly={true}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="time"
            label="Время мероприятия"
            value={formik.values.eventTime}
            name="eventTime"
            readOnly={true}
            sx={{ gridColumn: "span 1" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Название места"
            value={formik.values.venueName}
            name="venueName"
            readOnly={true}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Адрес"
            value={formik.values.address}
            name="address"
            readOnly={true}
            sx={{ gridColumn: "span 4" }}
          />
          {isCreator && <Button type="submit">Обновить</Button>}
        </Box>
      </form>
    </Box>
  );
};

export default EventForm;