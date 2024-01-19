import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Grid, Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../utils/Header";
import InvitationIcon from "@mui/icons-material/Mail";
import EventSettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from '../../api/axios';

const Events = ({userId}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/invitation/${userId}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  const invite = async (eventId, userId) => {
    try {
      await axios.post('http://localhost:8080/api/invitation/invite', {
        eventId,
        userId,
      });
      setOpen(false);
    } catch (error) {
      console.error('Ошибка отправки приглашения:', error.message);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/all`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (userId) {
      fetchUsers();
    }
  }, [userId]);

  const deleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/event/delete`);
    } catch (error) {
      console.error('Ошибка при удалении события:', error);
    }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="БЛИЖАЙШИЕ МЕРОПРИЯТИЯ"
          subtitle={"Здесь представлен список мероприятий пользователя"}
        />
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
            <Grid
              container
              spacing={1}
              alignItems="center"
              style={{ padding: 20 }}
            >
              <Grid item xs={6}>
                <Header
                  title={event.eventName}
                  subtitle={event.eventDate + " " + event.eventTime}
                  onClick={() => navigate("/event/info", { replace: true })}
                />
              </Grid>
              <Grid item xs={6}>
              {event.authorId === userId && (
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  <IconButton onClick={handleClickOpen}>
                    <InvitationIcon />
                  </IconButton>
                  <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Пригласить на мероприятие</DialogTitle>
                    <List>
                      {users.map((user) => (
                        <ListItem onClick={() => invite()} key={user}>
                          <ListItemText primary={user.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Dialog>
                  <IconButton
                    onClick={() => navigate("/event/update", { replace: true })}
                  >
                    <EventSettingsIcon />
                  </IconButton>
                  <IconButton
                    onClickCapture={deleteEvent}
                    onClick={handleRefresh}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Events;
