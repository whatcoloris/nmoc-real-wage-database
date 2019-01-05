
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
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';

import withRoot from "./withRoot";
import FormField from "./FormField";

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
    headline: {
      marginBottom: theme.spacing.unit * 2
    },
    beta: {
      color: '#f1f'
    },
    info: {
      marginTop: theme.spacing.unit * 2
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
      margin: theme.spacing.unit * 2
    },
    footer: {
      textAlign: 'right',
      margin: '1em 1em 0'
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
    }
  });

const blankValidator = (value) => value.length === 0;
const descriptionValidator = (value) => {
  const current_length = value.trim().split(/\s+/).length;
  return current_length > 400 || current_length < 2;
};

const project_form = {
  items: [
    {
      id: "contact_name",
      label: "CONTACT NAME",
      help: "This will not be published.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "contact_email",
      label: "CONTACT EMAIL",
      help:
        "Email address of person submitting this form. This will not be published, but we will use it to contact you. Please enter an email that you check regularly. If you make a typo here, we will not be able to contact you, ever.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "contact_phone",
      label: "CONTACT PHONE NUMBER",
      help: "This will not be published. A phone number is required.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "title",
      label: "TITLE OF PIECE",
      help: "This will be printed in all caps in the heading of the work, however we will use American Title Capitalization style for the body of the text, unless there is unusual capitalization indicated here.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "contributor",
      label: "NAME(S) OF CREATOR(S) OR GROUP",
      help:
        "This will be the byline. If more than one author, please separate by commas. Please don't use this field for other collaborators and participants; there will be a field below for them. ",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "collaborators",
      label: "Names(s) of Other Collaborators",
      help:
        "This will appear as a sub-byline. Please only list key collaborators; do not include sponsoring and producing institutions, curators, festivals, audience participants, etc. (if absolutely necessary, these specifics can be included at the end of your performance description). Because space is limited, please do NOT include the roles of the key collaborators; e.g., (composer) Bjork.",
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },{
      id: "date_first_performed",
      label: "Date of First Performance",
      help:
        "If the performance was durational, indicate the start date. ***IF THE FIRST PERFORMANCE OF YOUR WORK PRECEDED JANUARY 1, 2018, IT CANNOT BE ACCEPTED.***",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "times_performed",
      label: "How many times was it performed in 2018?",
      help:
        'Please type a number.',
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "venue",
      label: "Venue where the first performance occurred.",
      help:
        "e.g., Grace Exhibition Space. If the venue is not a traditional performance venue, please try to specify where it was; e.g., a street in Times Square; the artist's studio; Mount Everest, etc.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "city",
      label: "City where the first performance occurred.",
      help: "",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "state_country",
      label: "Country (or state) where the first performance occurred.",
      help:
        "If within US, list the state instead of the country: e.g., California. If outside US, list the country: e.g., Vietnam.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "home",
      label:
        "Where are the creators based? (to be published; optional)",
      help:
        'Listing your base can help local audiences find you. Please list City, State (if in the US), and Country (if outside of the US). If the creator lives in multiple cities, use "&": e.g., Brooklyn, NY & Tokyo, Japan. If group members are based in different cities, use slashes: e.g., New York, NY / Tokyo, Japan / Paris, France.',
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },
    {
      id: "published_contact",
      label: "Creator/Group contact email (to be published; optional)",
      help:
        "We cannot include more than one email address.",
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },{
      id: "links",
      label: "Creator/Group website (to be published; optional)",
      help:
        "We cannot include more than one website.",
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },{
      id: "description",
      label: "Description of performance",
      help:
        'The description may not exceed 400 words; if it does it will be discarded and your submission will not be read. Because INDEX includes many different genres of performance, your description *must* include an explanation of the purpose of the work, the problematic the performance was made to address, or the context to which the work responded. The description of the performance itself should give the reader a sense of what happened, with particular focus on the way the work dealt with the challenges at hand... Note that performance titles should be in quotes, while film and book titles should be italicized. (Please use asterisks to indicate italics where necessary); e.g. “Of Mice and Mice” was a mash-up of Steinbeck’s *Of Mice and Men* and the 1939 film *Gone with the Wind*. Generally, we encourage you to use the first-person "I" and "we" instead of the third-person "the artist."',
      value: "",
      required: true,
      error: false,
      validator: descriptionValidator
    },{
      id: "photo_credit",
      label: "Image Credit",
      help:
        "Please enter the name of the person the photo/image should be credited to.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    }
  ],
  already_submitted: undefined,
  inProgress: undefined
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_form: project_form,
      photoError: undefined,
      isUploadingPhoto: false,
      photoUrl: undefined,
      photoName: undefined,
      submitError: undefined,
      validationError: undefined,
      submitSuccess: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.submit = this.submit.bind(this);
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
      this.setState({project_form: { items }, validationError: 'Oops, please type a response for '+error_items.length+' missing required field(s)!', submitError: undefined, submitSuccess: false});
    }else{
      this.submit();
    }
  }
  
  submit() {
    console.log('submit, state is:',this.state);
    const postData = { 
      data: this.state
    }
    // console.log('gonna submit:',postData);
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
      resp => this.setState({submitError: resp.error, submitSuccess: resp.data })
    ).catch(
      error => this.setState({submitError: true, submitSuccess: undefined})
    ); 
  }
  
  handlePhotoChange(event) {
    this.setState({isUploadingPhoto: true, photoName: event.target.files[0].name, photoError: undefined});
    
    const data = new FormData();
    data.append('photo', event.target.files[0]);

    fetch('/photo', {
      method: 'POST',
      body: data
    }).then(
      response => response.json()
    ).then(
      resp => {
        console.log(resp)
        this.setState({isUploadingPhoto: false, photoError: resp.error, photoUrl: resp.data});
      }
    ).catch(
      error => {
        console.warn(error)
        this.setState({isUploadingPhoto: false, photoError: error});
      }
    );
    event.target.value = '';
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h3" component="h3" className={classes.headline}>
            Emergency INDEX
          </Typography>
          <Typography variant="h4" component="h4" className={classes.headline}>
            Vol. 8 Submissions
          </Typography>
          <Typography variant="h4" component="h4" className={classes.beta}>
            NOTE: this is just a test form! <br />don't submit actual performance. 
          </Typography>
          {!this.state.submitSuccess && <React.Fragment>
            <Typography component="p" className={classes.info}>
              Emergency INDEX allows you to report and document novel strategies,
              innovations and ideas in a performance-based work you made in 2018. To
              submit a performance for INDEX Vol. 8, please fill out the form below.
            </Typography>
            <Typography className={classes.info} component="p">
              If you have questions, please see our <a href="https://emergencyindex.com/submit/faq/" target="_blank" rel="noopener noreferrer">FAQ page</a>, or email
              us at emergencyindex@uglyducklingpresse.org. 
            </Typography>
            <Typography className={classes.info} component="p">
              The deadline is <b> February 15, 2019 at 11:59pm  EST</b>; 
              this deadline is strict, and we cannot consider submissions sent 
              after this date. Please submit only one work; authors and collectives 
              who submit more than one work will be disqualified.
            </Typography>
            <Typography className={classes.required} component="p">
              * Required
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              {project_form.items.map((field, idx) => (
                <FormField
                  label={field.label}
                  help={field.help}
                  required={field.required}
                  key={idx}>
                  <TextField
                    value={field.value}
                    id={field.id}
                    type={field.id.match(/date/) ? "date" : "text"}
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
                </FormField>
              ))}

              <FormField
                label="Image"
                help="It should not be a flier, poster, or promotional material. You must have all
permissions to publish the image. The published image will be 5x7 (portrait or landscape orientation) and black & white (grayscale). We will adjust any image sent to this format, cropping if necessary. Please deliver files in the highest resolution possible at a minimum 300 DPI at 5x7 inches or 1500 x 2100 pixels. JPEG or TIFF files preferred"
                required>
                <br/>
                <input type="file" name="photo" accept=".tif,.tiff, image/tiff" onChange={this.handlePhotoChange} disabled={this.state.isUploadingPhoto || this.state.photoUrl} />
                {this.state.isUploadingPhoto && <LinearProgress />}
                {this.state.photoError && <div className={classes.error}>{this.state.photoError}</div>}
                {this.state.photoName && <b>{this.state.photoName}</b>}
              </FormField>

              <FormField
                label="Have you, or any of the people named above, already submitted a performance for this volume of Emergency Index?"
                help=""
                required>
                <RadioGroup
                  aria-label="Already Submitted"
                  name="already_submitted"
                  className={classes.group}
                  onChange={(event) => this.handleRadio(event, 'already_submitted')}>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormField>
              
              <Typography component="p" className={classes.info}>
                If you are interested in hosting an Emergency Index-related event or helping 
                with the production of Emergency Index, please email 
                emergency@uglyducklingpresse.org
              </Typography>

              <div className={classes.divider}>
                <Divider variant="middle" />
              </div>

              <Button onClick={this.handleSubmit} variant="contained" color="primary" size="large" disabled={this.state.isUploadingPhoto} fullWidth>Submit</Button>
              {this.state.submitError && <Typography component="p" className={classes.submitError}>Oh noz! Something bad happened and your submission cannot be processed right now. Please email emergencyindex2018@gmail.com</Typography>}
              {this.state.validationError && <div><Typography component="p" className={classes.submitError}> {this.state.validationError}</Typography><Typography component="p" className={classes.submitError}>If you want to submit your entry as-is <Button href="#" onClick={this.submit}>click here.</Button></Typography><Typography component="p" className={classes.submitError}> NOTE: incomplete submissions will likely not get read!</Typography></div>}
            </form>
          </React.Fragment>}
          {this.state.submitSuccess && <Typography variant="h4" component="h4" className={classes.thankyou}>{this.state.submitSuccess}<div><span role="img" aria-label="smile cat">😸</span></div></Typography>}
        </Paper>
        <footer className={classes.footer}>
          <a 
            href="https://github.com/edwardsharp" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={classes.footerLink}>
            Made with <span role="img" aria-label="black heart">🖤</span> in NYC
          </a>
        </footer>
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)(App));
