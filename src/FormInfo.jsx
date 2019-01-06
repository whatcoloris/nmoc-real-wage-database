import * as React from "react";
import Typography from "@material-ui/core/Typography";
import withRoot from "./withRoot";

class FormInfo extends React.Component {
  render() {
    return (
      <div>
        <Typography component="p" className="info">
          Emergency INDEX allows you to report and document novel strategies,
          innovations and ideas in a performance-based work you made in 2018. To
          submit a performance for INDEX Vol. 8, please fill out the form below.
        </Typography>
        <Typography className="info" component="p">
          If you have questions, please see our <a href="https://emergencyindex.com/submit/faq/" target="_blank" rel="noopener noreferrer">FAQ page</a>, or email
          us at <a href="mailto:emergency@uglyducklingpresse.org">emergency@uglyducklingpresse.org</a>.
        </Typography>
        <Typography className="info" component="p">
          The deadline is <b> February 15, 2019 at 11:59pm  EST</b>; 
          this deadline is strict, and we cannot consider submissions sent 
          after this date. Please submit only one work; authors and collectives 
          who submit more than one work will be disqualified.
        </Typography>
      </div>
    );
  }
}

export default withRoot(FormInfo);
