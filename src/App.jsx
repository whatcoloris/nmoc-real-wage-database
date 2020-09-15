import * as React from "react";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import withRoot from "./withRoot";
import FormField from "./components/FormField";
import FormHeading from "./form/FormHeading";
import FormInfo from "./form/FormInfo";
import FormFooter from "./form/FormFooter";
import ProjectForm from "./form/ProjectForm";

const styles = (theme) =>
  createStyles({
    root: {
      ...theme.mixins.gutters(),
      margin: "auto",
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 4,
      maxWidth: "666px"
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing.unit * 4
    },
    required: { marginTop: theme.spacing.unit * 2, color: "red" },
    textField: {},
    label: {},
    help: {},
    formControl: {
      margin: `${theme.spacing.unit * 3} 0`,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
    divider: {
      margin: '2em 0',
      width: '100%'
    },
    thankyou: {
      textAlign: 'center',
      margin: '2em 0'
    },
    footer: {
      textAlign: 'center',
      margin: '6em 1em 0'
    },
    footerLink: {
      color: 'black',
      textDecoration: 'none',
      fontSize: '0.75em'
    },
    error: {
      color: 'red',
    },
    submitError: {
      color: 'red',
      margin: '1.5em 0'
    },
    photoName: {
      display: 'inline' 
    }
  });


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_form: ProjectForm.project_form,
      submitError: undefined,
      validationError: undefined,
      submitSuccess: undefined,
      date_submitted: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.beforeUnload = this.beforeUnload.bind(this);
    window.addEventListener('beforeunload', this.beforeUnload);
  }

  beforeUnload(e){
    if (this.state.inProgress) {
      if (!window.confirm("Are you sure you want to leave? Your changes will be lost.")) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
      }
    }
  }
  
  inputTypeFor(id){
    if (/date/.test(id)) {
      return 'date';
    } else if (/geographic_loc/.test(id)) {
      return 'location'; 
    } else if (/ensemble/.test(id)) {
      return 'ensemble'; 
    } else if (/venue/.test(id)) {
      return 'venue'; 
    } else if (/pay/.test(id)) {
      return 'dollar_amt';
    } else if (/services_num/.test(id) || /services_avg/.test(id)) {
      return 'number'; 
    } else if (/gig_type/.test(id)) {
      return 'gig'; 
    } else if (/contract/.test(id) || /gig_union/.test(id) || /paid_on_time/.test(id) || /per_diem/.test(id) || /extra_work/.test(id) || /red_flag/.test(id)) {
      return 'boolean'; 
    } else if (/presenter/.test(id)) {
      return 'presenter'; 
    } else {
      return 'text';
    }
  }
  
  handleChange(event, idx) {
    event.persist();
    this.setState(
      (prevState) => {
        const item = prevState.project_form.items[idx]
        if (item) {
          item.value = event.target.value;
          if(item.required){ 
            item.error = item.validator(event.target.value)
            item.helperText = item.error ? 'Required' : ''
          }
          if(item.id === 'description'){
            const current_length = event.target.value.trim().split(/\s+/).length;
            item.helperText = `${item.error ? current_length > 1 ? 'Too long!' : 'Required' : ''} ${current_length} / 400`
          }
        }
        prevState.inProgress = true;
        return prevState;
      });
  };
  
  handleRadio(event, key) {
    event.persist();
    this.setState(
      (prevState) => {
        prevState.project_form[key] = event.target.value;
        return prevState;
      }
    );
  }
  
  handleSubmit() {
    const items = this.state.project_form.items
    items.forEach( (item) => {
      if(item.required){ 
        item.error = item.validator(item.value);
        item.helperText = item.error ? 'Required' : '';
      }
    });
    const error_items = items.filter( i => i.error );
    if(error_items.length > 0){
      this.setState({project_form: { items }, validationError: 'Oops, please type a response for '+error_items.length+' missing required fields!', submitError: undefined, submitSuccess: false});
    }else{
      this.setState({validationError: undefined}, () => this.submit());
    }
  }
  
  submit() {
    const postData = { 
      data: this.state
    }
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then(
      response => response.json()
    ).then(
      resp => this.setState({submitError: resp.error, submitSuccess: resp.data, inProgress: false })
    ).catch(
      () => this.setState({submitError: true, submitSuccess: undefined})
    ); 
  }
  
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root} elevation={1}>
          <FormHeading />
          {!this.state.submitSuccess && <React.Fragment>
            <FormInfo />
            <Typography className={classes.required} component="p">
              * Required
            </Typography>
            <form className={classes.container}>
              {ProjectForm.project_form.items.map((field, idx) => (
                <FormField
                  label={field.label}
                  help={field.help}
                  required={field.required}
                  key={idx}>
                  {field.type === "select" &&
                      <Select labelId="label" id="select" value="Neither">
                        <MenuItem value="W2">W2</MenuItem>
                        <MenuItem value="1099">1099</MenuItem>
                        <MenuItem value="Neither">Neither</MenuItem>
                      </Select>}
                  {field.type === "radio" &&
                      <RadioGroup
                        className={classes.group}
                        onChange={(event) => this.handleRadio(event, 'radio')}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>}
                  {field.type === "text" &&
                    <TextField
                    value={field.value}
                    id={field.id}
                    type={this.inputTypeFor(field.id)}
                    className={classes.textField}
                    onChange={(event) => this.handleChange(event, idx)}
                    placeholder="Your Answer"
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    required={field.required}
                    rowsMax={field.id === "description" ? 32 : 1}
                    multiline={field.id === "description"}
                    helperText={field.helperText}
                    error={field.error}
                    fullWidth />
                  }
                  {field.type === "location" &&
                    <TextField
                    value={field.value}
                    id={field.id}
                    type={this.inputTypeFor(field.id)}
                    className={classes.textField}
                    onChange={(event) => this.handleChange(event, idx)}
                    placeholder="Your Answer"
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    required={field.required}
                    rowsMax={field.id === "description" ? 32 : 1}
                    multiline={field.id === "description"}
                    helperText={field.helperText}
                    error={field.error}
                    fullWidth />
                  }
                  {field.type === "number" &&
                    <TextField
                    value={field.value}
                    id={field.id}
                    type={this.inputTypeFor(field.id)}
                    className={classes.textField}
                    onChange={(event) => this.handleChange(event, idx)}
                    placeholder="Your Answer"
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    required={field.required}
                    rowsMax={field.id === "description" ? 32 : 1}
                    multiline={field.id === "description"}
                    helperText={field.helperText}
                    error={field.error} />
                  }
                  {field.type === "currency" &&
                    <OutlinedInput
                      value={field.value}
                      id={field.id}
                      type={this.inputTypeFor(field.id)}
                      className={classes.textField}
                      onChange={(event) => this.handleChange(event, idx)}
                      placeholder="Your Answer"
                      InputLabelProps={{
                        shrink: true
                      }}
                      margin="normal"
                      required={field.required}
                      rowsMax={field.id === "description" ? 32 : 1}
                      multiline={field.id === "description"}
                      helperText={field.helperText}
                      error={field.error}
                      fullWidth
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />}
                  {field.type === "notes" &&
                    <TextField
                    value={field.value}
                    label="Notes: "
                    id={field.id}
                    type={this.inputTypeFor(field.id)}
                    className={classes.textField}
                    onChange={(event) => this.handleChange(event, idx)}
                    placeholder="Extra information regarding this question"
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    required={field.required}
                    rowsMax={field.id === "description" ? 32 : 1}
                    multiline={field.id === "description"}
                    helperText={field.helperText}
                    error={field.error}
                    fullWidth />}
                </FormField>
              ))}
              
              <FormFooter />

              <div className={classes.divider}>
                <Divider variant="middle" />
              </div>

              <Button onClick={this.handleSubmit} variant="contained" color="primary" size="large" disabled fullWidth>Submit</Button>
              {this.state.submitError && <Typography component="p" className={classes.submitError}>Oh noz! Something bad happened and your submission cannot be processed right now. Please email newmusicorganizingcaucus@gmail.com</Typography>}
              {this.state.validationError && <div><Typography component="h6" className={classes.submitError}> {this.state.validationError} <br/>Please correct these errors and click the "Submit" button again.</Typography><Typography component="p" className={classes.submitError}>If you want to submit your entry as-is <Button href="#" onClick={this.submit}>click here.</Button></Typography><Typography component="p" className={classes.submitError}><b>NOTE: incomplete submissions will likely not get read!</b></Typography></div>}
            </form>
          </React.Fragment>}
          {this.state.submitSuccess && <Typography variant="h4" component="h4" className={classes.thankyou}>{this.state.submitSuccess}<div><span role="img" aria-label="smile cat">😸</span></div></Typography>}
        </Paper>
        <footer className={classes.footer}>
          <a 
            href="https://github.com/nmoc-real-wages-database" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={classes.footerLink}>
            Made with <span role="img" aria-label="black heart">🖤</span> in Hurley, NY
          </a>
        </footer>
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(App));
