import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Logo from "../../assets/logo192.png";
import { Box, Button, Typography, useTheme } from "@mui/material";

function SignUpForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          login,
          password,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
      navigate("/login", { replace: true })
    } catch (error) {
      console.error(error);
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
            Sign Up
          </Typography>
        </Box>
      </Box>

      <Box
        minHeight={"40svh"}
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
              Username
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
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Box>
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
              value={login}
              color={colors.primary[100]}
              onChange={(event) => setLogin(event.target.value)}
            />
          </Box>
          <Box minHeight={"3svh"} minWidth={"30svh"}>
            <p textAlign="end" style={{ color: "#000000", fontSize: 16 }}>
              Password
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
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Box>
          <Box
            minWidth={"30svh"}
            justify-content="center"	
            textAlign="center"
            paddingTop={2}
          >
            <Button style={{ minWidth: "100%", minHeight: "100%", backgroundColor: "#238636" }} type="submit">
              <Typography color="#FFFFFF">SIGN UP</Typography>
            </Button>
          </Box>
        </form>
        <p style={{ color: "#000000", fontSize: 16 }}>
          Already have an Account? <Link to="/login">Sign in</Link>
        </p>
      </Box>
    </Box>
  );
};

export default SignUpForm