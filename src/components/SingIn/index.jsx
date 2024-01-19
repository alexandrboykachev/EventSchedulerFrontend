import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Logo from "../../assets/logo192.png";
import axios from '../../api/axios';

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Это поле обязательно к заполнению!
      </div>
    );
  }
};

function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        login,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      console.log('Успешный вход!', response.data);
      navigate("/", { replace: true })
      window.location.reload();
    } catch (error) {
      console.error('Ошибка входа:', error.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight={"100%"}
      minWidth={"100%"}
      backgroundColor={colors.primary[600]}
    >
      <Box
        minHeight={"20svh"}
        minWidth={"40svh"}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box textAlign="center">
          <img alt="logo" width="92px" height="92px" src={Logo} />
          <Typography variant="h5" color={"#FFFFFF"}>
            Sign in to MeetUp
          </Typography>
        </Box>
      </Box>

      <Box
        minHeight={"30svh"}
        minWidth={"40svh"}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        borderRadius={4}
        backgroundColor={colors.greenAccent[800]}
      >
        <form onSubmit={handleSubmit}>
          <Box minHeight={"3svh"} minWidth={"30svh"}>
            <p textAlign="end" style={{ color: "#000000", fontSize: 16 }}>
              Login
            </p>
          </Box>
          <Box
            minWidth={"30svh"}
            minHeight={"3svh"}
            borderRadius="3px"
            border={2}
            borderColor={colors.primary[200]}
          >
            <input
              style={{ width: "100%", height: "3svh" }}
              type="text"
              color={colors.primary[100]}
              id="login"
              autoComplete="off"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
              validations={[required]}
            />
          </Box>
          <Box minHeight={"3svh"} minWidth={"30svh"}>
            <p textAlign="end" style={{ color: "#000000", fontSize: 16 }}>
              Password
            </p>
          </Box>
          <Box
            minWidth={"30svh"}
            borderRadius="3px"
            border={2}
            borderColor={colors.primary[200]}
          >
            <input
              style={{ width: "100%", height: "3svh" }}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              validations={[required]}
            />
          </Box>
          <Box
            minWidth={"30svh"}
            justify-content="center"
            textAlign="center"
            paddingTop={2}
          >
            <Button
              style={{
                minWidth: "100%",
                minHeight: "100%",
                backgroundColor: "#238636",
              }}
              type="submit"
              //onClick={() => navigate("/", { replace: true })}
            >
              <Typography color="#FFFFFF">SIGN IN</Typography>
            </Button>
          </Box>
        </form>
        <p style={{ color: "#000000", fontSize: 16 }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login