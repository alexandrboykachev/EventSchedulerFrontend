import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../utils/Header";
import formatDate from "../../utils/FormatDate";
import AcceptIcon from "@mui/icons-material/Check";
import RefuseIcon from "@mui/icons-material/Close";
import axios from '../../api/axios';

const Invitations = ({userId}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState([]);
  
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/invitation/${userId}`
        );
        setInvitations(response.data);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
    if (userId) {
      fetchInvitations();
    }
  }, [userId]);

  const acceptInvitation = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/invitation/${id}/accept`);
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при приеме приглашения:', error);
    }
  }

  const refuseInvitation = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/invitation/${id}/refuse`);
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при отказе от приглашения:', error);
    }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ПРИГЛАШЕНИЯ"
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* INVITATIONS */}
        {invitations.map((invitation) => (
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            key={invitation.id}
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
                  title={invitation.eventDto.name}
                  subtitle={formatDate(invitation.eventDto.date_time)}
                  onClick={() => navigate("/event/info", { replace: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  <IconButton onClick={()=>acceptInvitation(invitation.id)}>
                    <AcceptIcon />
                  </IconButton>
                  <IconButton onClick={()=>refuseInvitation(invitation.id)}>
                    <RefuseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Invitations;