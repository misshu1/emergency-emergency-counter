import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import React, { useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { Container } from './style';

const useStyles = makeStyles({
  loginButton: {
    backgroundColor: "#43a047",
    border: 0,
    borderRadius: 3,
    color: "white",
    padding: ".2rem 1rem",
    margin: "auto 0",
    cursor: "default",
    "&:hover": {
      backgroundColor: "#3a8a3d",
    },
  },
  form: { width: "15rem", padding: "1rem" },
  input: {
    width: "100%",
    margin: "1rem 0",
  },
})

function ToolbarApp() {
  const classes = useStyles()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = useAuth()

  const openLoginDialog = () => {
    setShowLoginDialog(true)
  }

  const closeLoginDialog = () => {
    setEmail("")
    setPassword("")
    setShowLoginDialog(false)
  }

  const handleLogin = async (e, email, password) => {
    e.preventDefault()
    const authUser = await auth
      .login(email, password)
      .catch(e => console.log(e))

    if (authUser) {
      closeLoginDialog()
    }
  }

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <h3 className="title">Emergency Counter</h3>
            {!auth.user && (
              <Button onClick={openLoginDialog} className={classes.loginButton}>
                Login
              </Button>
            )}
            {auth.user && (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={auth.logout}
                // className={classes.loginButton}
              >
                Log Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Container>
      <Dialog open={showLoginDialog} onClose={closeLoginDialog}>
        <form className={classes.form} autoComplete="off">
          <h3 style={{ margin: 0 }}>Login</h3>
          <TextField
            onChange={e => setEmail(e.target.value)}
            label="Email"
            className={classes.input}
            type="text"
            value={email}
            autoComplete="off"
            required
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            label="Password"
            className={classes.input}
            type="password"
            value={password}
            autoComplete="off"
            required
          />
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={e => handleLogin(e, email, password)}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              onClick={closeLoginDialog}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default ToolbarApp
