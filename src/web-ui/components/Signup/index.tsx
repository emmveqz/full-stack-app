import Box			from "@mui/material/Box"
import Button		from "@mui/material/Button"
import CardContent	from "@mui/material/CardContent"
import Grid			from "@mui/material/Grid"
import Paper		from "@mui/material/Paper"
import TextField	from "@mui/material/TextField"
import Typography	from "@mui/material/Typography"
import React, {
	FC,
} from "react"
import {
  useSignupBL,
} from "./bl"
import {
  IProps,
} from "./types"
import PEOnboarding from "../PEOnboarding"
import {
  PayEnginePublicKey,
} from "../../config"

//

const Signup: FC<IProps> = () => {
  const {
    errors,
    merchantId,
    message,
    onFieldChanged,
    submitForm,
  } = useSignupBL()

  // Could be cleaner with routes, but let's leave it as is for now.
  return merchantId
    ? (
      <PEOnboarding apiPublicKey={PayEnginePublicKey} merchantId={merchantId} />
    )
    : (
      <Box>
        <Box>
          <Paper>
            <Box>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h3" color="textPrimary">Welcome</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Either register, or log in with pre-existent credentials.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" justifyItems="center">
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Name"
                    onChange={onFieldChanged}
                    name="name"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Email"
                    onChange={onFieldChanged}
                    name="email"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  {
                    !!message &&
                    <Typography variant="subtitle1" color="red">
                      {message}
                    </Typography>
                  }
                  <Box>
                    <Button
                      disableElevation
                      fullWidth
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={submitForm}
                    >
                      Go
                    </Button>
                  </Box>
                </Grid>
              </CardContent>
            </Box>
          </Paper>
        </Box>
      </Box>
    )
}

export default Signup
