import React, { useReducer, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { UserContext } from '@contexts/UserContext';

function loginReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                isLoading: true,
                error: '',
            }
        }
        case 'set-value': {
            return {
                ...state,
                [action.field]: action.value,
            }
        }
        case 'success': {
            return {
                ...state,
                // isLoading: false,
            }
        }
        case 'error': {
            return {
                ...state,
                isLoading: false,
                error: action.value,
            }
        }
        default: break;
    }
    return state;
}

const initialState = {
    isLoading: '',
    error: '',
    username: '',
    room: '',
}

const styles = makeStyles((theme) => ({
    card: {
        maxWidth: 800,
        minWidth: 600,
        marginTop: theme.spacing(20),
    },
    main_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(1),
        height: "100vh",
        maxHeight: 120,
    },
    input_field: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: 250,
        minWidth: 120,
    },
    login_button: {
        marginTop: theme.spacing(4),
        width: 150,
    },
    error_message: {
        color: "red",
        marginTop: 10,
    },
    logo: {
        margin: 20,
        width: 100,
    },
}));

function LoginForm() {
    const classes = styles();
    const [state, dispatch] = useReducer(loginReducer, initialState);
    const { isLoading, error, username, room } = state;
    const { handleSetUser } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'login' });

        try {
            handleSetUser({
                id: Date.now(),
                name: username
            });
        } catch (error) {
            dispatch({ type: 'error' });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className={classes.card}>
                <CardContent>
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                        spacing={36}
                    >
                        <Typography variant="h5">Login</Typography>
                        <TextField
                            label="Username"
                            className={classes.input_field}
                            margin="normal"
                            name="username"
                            onChange={e =>
                                dispatch({
                                    type: 'set-value',
                                    field: 'username',
                                    value: e.target.value
                                })}
                        />
                        {/* <TextField
                            label="Room"
                            className={classes.input_field}
                            margin="normal"
                            onChange={e =>
                                dispatch({
                                    type: 'set-value',
                                    field: 'room',
                                    value: e.target.value
                                })}
                        /> */}

                        {error && (
                            <Typography variant="caption" className={classes.error_message}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            className={classes.login_button}
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            LOGIN
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}

export default LoginForm
