import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { Box, Switch, InputBase, FormControlLabel, IconButton, useTheme, 
          Grid, Dialog, DialogTitle, List, ListItem, ListItemText } from "@mui/material";
import Header from "../../utils/Header";
import formatDate from "../../utils/FormatDate";
import InvitationIcon from "@mui/icons-material/Mail";
import EventSettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from "@mui/icons-material/Search";
import axios from '../../api/axios';

const Events = ({userId}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [filterByAuthor, setFilterByAuthor] = useState(false);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSwitchChecked = () => {
    setFilterByAuthor(!filterByAuthor);
    if (filterByAuthor) {
      fetchEvents();
    } else {
      filterByAuthorEvents();
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/event/user/${userId}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/all`);
        setUsers(response.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
    if (userId) {
      fetchUsers();
    }
  }, [userId]);

  const searchEvents = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/event/name`, {
        userId,
        searchString,
        filterByAuthor
      });
        setEvents(response.data);
    } catch (error) {
      console.error('Ошибка поиска мероприятий:', error);
    }
  }

  const filterByAuthorEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/event/author/${userId}`);
        setEvents(response.data);
    } catch (error) {
      console.error('Ошибка фильтрации данных:', error);
    }
  }

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

  const deleteEvent = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:8080/api/event/delete/${id}`);
    } catch (error) {
      console.error('Ошибка при попытке удаления мероприятия:', error);
    }
    window.location.reload();
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="БЛИЖАЙШИЕ МЕРОПРИЯТИЯ"
          subtitle={"Здесь представлен список мероприятий пользователя"}
        />
        <FormControlLabel 
        checked={filterByAuthor}
        onChange={() => onSwitchChecked()}
        control={<Switch defaultChecked />} 
        label="Автор" />
      </Box>
      {/* SEARCH BAR */}
      <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          style={{marginBottom:10}}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Поиск"
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
        />
        <IconButton type="button" sx={{ p: 1 }} onClick={() => { searchEvents() }}>
          <SearchIcon />
        </IconButton>
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
                  title={event.name}
                  subtitle={formatDate(event.date_time)}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  spacing={1}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <IconButton
                    onClick={() => navigate("/event/info", { state: { eventId: event.id, userId: userId }, replace: true })}
                  >
                    <InfoIcon />
                  </IconButton>
                  <IconButton onClick={handleClickOpen}>
                    <InvitationIcon />
                  </IconButton>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Пригласить на мероприятие</DialogTitle>
                    <List>
                      {users.map((user) => (
                        <ListItem onClick={() => invite(event.id, user.id)} key={user.id}>
                          <ListItemText primary={user.username} />
                        </ListItem>
                      ))}
                    </List>
                  </Dialog>
                  
                  {event.authorId === userId && (
                  <IconButton
                    onClick={() => navigate("/event/update", { state: { eventId: event.id }, replace: true })}
                  >
                    <EventSettingsIcon />
                  </IconButton>
                  )}
                  {event.authorId === userId && (
                  <IconButton onClick={() => deleteEvent(event.id)}>
                    <DeleteIcon />
                  </IconButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Events;

