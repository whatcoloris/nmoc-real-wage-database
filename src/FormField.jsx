import * as React from "react";
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "./withRoot";
// import TextField from "@material-ui/core/TextField";
// import { Project } from "../project";

const styles = (theme) =>
  createStyles({
    root: { marginTop: theme.spacing.unit * 4, width: "100%" },
    required: { color: "red" },
    label: { textTransform: "uppercase" },
    help: {}
  });

// interface Props {
//   label: string;
//   help?: string;
//   required: boolean;
// }
//<WithStyles<typeof styles> & Props>
class FormField extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h6" component="h6" className={classes.label}>
          {this.props.label}{" "}
          {this.props.required && <span className={classes.required}>*</span>}
        </Typography>
        {this.props.help && (
          <Typography component="p" className={classes.help}>
            {this.props.help}
          </Typography>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(FormField));
