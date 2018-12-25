
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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

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
      margin: theme.spacing.unit * 3,
    },
    group: {
      margin: `${theme.spacing.unit}px 0`,
    },
    divider: {
      margin: '2em 0',
      width: '100%'
    },
    footer: {
      textAlign: 'right',
      margin: '1em 1em 0'
    },
    footerLink: {
      color: 'black',
      textDecoration: 'none',
      fontSize: '0.75em'
    }
  });

const blankValidator = (value) => value.length === 0;

const project_form = {
  items: [
    {
      id: "contact_name",
      label: "Name",
      help: "This will not be published.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "contact_email",
      label: "Contact Email",
      help:
        "Email address of person submitting this form. This will not be published, but we will use it to contact you. Please enter an email that you check regularly. If you make a typo here, we will not be able to contact you, ever.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "contact_postal",
      label: "POSTAL ADDRESS OF CONTACT",
      help: "This will not be published. A postal address is required.",
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
      label: "TITLE OF PIECE (PLEASE WRITE IN ALL CAPS)",
      help: "",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "contributor",
      label: "NAME(S) OF CREATOR(S) OR GROUP (PLEASE WRITE IN ALL CAPS)",
      help:
        "This will be the byline. If you would like the byline to include both the group name and the name of the primary collaborator(s) who constitute that group, please use a slash; e.g. “THE BEATLES / GEORGE HARRISON, JOHN LENNON, PAUL MCCARTNEY & RINGO STARR.” Please don't use this field for other collaborators and participants; there will be a field below for them.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "collaborators",
      label: "Names(s) of Other Key Collaborators (Please write in Title Case)",
      help:
        "This will appear as a sub-byline. Please only list key collaborators; do not include sponsoring and producing institutions, curators, festivals, audience participants, etc. (if absolutely necessary, these specifics can be included at the end of your performance description). Because space is limited, please do NOT include the roles of the key collaborators; e.g., (composer) Bjork. If such information is necessary please include it in your description.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "date_first_performed",
      label: "Date of First Performance",
      help:
        "If the performance was durational, indicate the start date here, and specify the duration in the field below. ***IF THE FIRST PERFORMANCE OF YOUR WORK PRECEDED JANUARY 1, 2018, IT CANNOT BE ACCEPTED.***",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "times_performed",
      label: "How many times was it performed in 2018?",
      help:
        'If your piece was performed more than 6 times, or was durational and ongoing, please choose "other" and specify below.',
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
        "Where are the creators based? City, State (if in the US), and Country (if outside of the US).",
      help:
        'If the creator lives in multiple cities, use "&": e.g., Brooklyn, NY & Tokyo, Japan. If group members are based in different cities, use slashes: e.g., New York, NY / Tokyo, Japan / Paris, France.',
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },
    {
      id: "published_contact",
      label: "Creator(s)/Group contact email (to be published; optional)",
      help:
        "If you must use more than one email address, separate them with a slash; e.g., emergency@uglyducklingpresse.org / emergencyindex2018@gmail.com. Please do not include more than two addresses.",
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },{
      id: "links",
      label: "Creator(s)/Group website (to be published; optional)",
      help:
        "Please do not use more than two websites. If two, separate with a slash; e.g., www.emergencyindex.com / www.uglyducklingpresse.org",
      value: "",
      required: false,
      error: false,
      validator: blankValidator
    },{
      id: "description",
      label: "Description of performance",
      help:
        'The description may not exceed 400 words; if it does it will be discarded and your submission will not be read. Because INDEX includes many different genres of performance, your description *must* include an explanation of the purpose of the work, the problematic the performance was made to address, or the context to which the work responded. *Also required* is a description of the performance itself; focus on describing whatever you think is particularly salient, or innovative, or most relevant. Use this as an opportunity to document what you think was most important about the work. Note that performance titles should be in quotes, while film and book titles should be italicized. (Please use asterisks to indicate italics where necessary); e.g. “Of Mice and Mice” was a mash-up of Steinbeck’s *Of Mice and Men* and the 1939 film *Gone with the Wind*. Generally, we encourage you to use the first-person "I" and "we" instead of the third-person "the artist."',
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    },{
      id: "photo_credit",
      label: "Photo Credit",
      help:
        "Please enter the name of the person the photo/image should be credited to.",
      value: "",
      required: true,
      error: false,
      validator: blankValidator
    }
  ],
  already_submitted: undefined,
  wants_to_get_involved: undefined,
  wants_to_host: undefined
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_form: project_form
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event, idx) {
    event.persist();
    this.setState(
      (prevState) => {
        const item = prevState.project_form.items[idx]
        if (item) {
          item.value = event.target.value;
          item.error = item.validator(event.target.value)
          item.helperText = item.error ? 'Required' : ''
          if(item.id === 'description'){
            item.helperText += ` ${event.target.value.length} / 666`
          }
        }
        return prevState;
      });
  };
  
  handleSelect(event, key) {
    console.log('handleSelect event:',event,' key:',key)
    event.persist();
    this.setState(
      (prevState) => {
        if(prevState.project_form[key]) {
          prevState.project_form[key] = event.target.value;
        }
        return prevState;
      }, () => console.log('state now:', this.state)
    );
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
          <Typography component="p" className={classes.info}>
            Emergency INDEX allows you to report and document novel strategies,
            innovations and ideas in a performance-based work you made in 2018. To
            submit a performance for INDEX Vol. 8, please fill out the form below.
            Once you complete this form, you will also need to email an image to
            accompany your submission; details on this are below.
          </Typography>
          <Typography className={classes.info} component="p">
            Guidelines are adjacent to each prompt; please read them carefully.
            You may want to prepare your *performance description* on a separate
            word document first and then cut-and-paste the final draft into the
            field below. If you have questions, please see our FAQ page, or email
            us at emergencyindex2018@gmail.com. The deadline is 
            <b> January 6, 2019 at midnight PST</b>; this deadline is strict, and
            we cannot consider submissions sent after this date. Please submit
            only one work; authors and collectives who submit more than one work
            will be disqualified. Please read all the instructions, and follow the
            guidelines carefully.
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
                  rowsMax={field.id === "description" ? 24 : 1}
                  multiline={field.id === "description"}
                  helperText={field.helperText}
                  error={field.error}
                  fullWidth />
              </FormField>
            ))}

            <FormField
              label="Photo"
              help="The image will need to be 5x7 inches, greyscale (b&w), 300dpi. It can be oriented vertically or horizontally. It can be a photo, but can also be a sketch or diagram. It should not be a flyer, poster, or promotional material. You must have all permissions to publish the image. The image should be saved as a .tif file"
              required>
              <br/>
              <input type="file" />
            </FormField>
            
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Have you, or any of the people named above, already submitted a performance for this volume of Emergency Index?</FormLabel>
              <RadioGroup
                aria-label="Already Submitted"
                name="already_submitted"
                className={classes.group}
                value={this.state.project_form.already_submitted}
                onChange={(event) => this.handleSelect(event, 'already_submitted')}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">If you are interested in getting involved in the production of Emergency Index, please check the box below.</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.project_form.wants_to_get_involved} onChange={(event) => this.handleSelect(event, 'wants_to_get_involved')} value="yes" />
                  }
                  label="Yes" />

              </FormGroup>
            </FormControl>
            
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">If you are interested in hosting an Emergency Index-related event, check the box below.</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={this.state.project_form.wants_to_host} onChange={(event) => this.handleSelect(event, 'wants_to_host')} value="yes" />
                  }
                  label="Yes" />

              </FormGroup>
            </FormControl>
            


            <div className={classes.divider}>
              <Divider variant="middle" />
            </div>

            <Button variant="contained" color="primary" size="large" fullWidth>Submit</Button>
          </form>
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
