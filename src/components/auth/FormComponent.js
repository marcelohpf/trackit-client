import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

// Form imports
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Validations from '../../common/forms';

import '../../styles/Login.css';
import logo from '../../assets/logo-coloured.png';

const Validation = Validations.Auth;

// Login Form Component
export class FormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: (this.props.match && this.props.match.params && this.props.match.params.prefill && this.props.match.params.prefill !== "timeout") ? decodeURIComponent(this.props.match.params.prefill) : '',
      password: '',
      passwordConfirmation: '',
    }
    this.submit = this.submit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submit = (e) => {
    e.preventDefault();
    const awsToken = (this.props.awsToken ? this.props.awsToken : null);
    this.props.submit(this.state.email, this.state.password, awsToken);
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    const password = (
      <div className="form-group">
        <label htmlFor="password">Password</label>
        {/**<Link
          to="/forgot"
          className="pull-right"
        >
          Forgot password ?
        </Link>*/}
        <Input
          type="password"
          name="password"
          className="form-control"
          validations={[Validation.required]}
          value={this.state.password}
          onChange={this.handleInputChange}
        />
      </div>
    );

    const buttons = (
      <div className="clearfix">
        <div>
          <Button
            className="btn btn-primary btn-block"
            type="submit"
          >
            {(this.props.loginStatus && !Object.keys(this.props.loginStatus).length ? (
              (<Spinner className="spinner" name='circle' color='white'/>)
            ) : (
              <div>
                <i className="fa fa-sign-in" />
                &nbsp;
                Sign in
              </div>
            ))}
          </Button>
        </div>
        {/**<br />
        <Link
          to={this.props.awsToken ? "/register/aws/" + this.props.awsToken : "/register"}
        >
          Don't have an account ? Register here.
        </Link>*/}
      </div>
    );

    let error;
    if (!this.props.registration) {
      error = (this.props.loginStatus && this.props.loginStatus.hasOwnProperty("error") ? (
        <div className="alert alert-warning">{this.props.loginStatus.error}</div>
      ): "");
    } else {
      error = (this.props.registrationStatus && this.props.registrationStatus.hasOwnProperty("error") ? (
        <div className="alert alert-warning">{this.props.registrationStatus.error}</div>
      ): "");
    }

    const timeout = (this.props.timeout ? (
      <div className="alert alert-warning">Your session expired. Please log in again.</div>
    ) : null);

    return (
      <div className="login">
        <div className="row">
          <div
            className="col-lg-4 offset-4 col-md-4 col-sm-6 parent"
          >
            <div className="white-box vertCentered">

              <img src={logo} id="logo" alt="TrackIt logo" />

              <hr />
              <h3 style={{textAlign: 'center'}}>
                {this.props.registration ? 'Register' : 'Sign in'}
              </h3>

              {error}
              {timeout}

              <Form
                onSubmit={this.submit}>

                {
                  !(this.props.registrationStatus && this.props.registrationStatus.status) &&
                  (
                    <div className="form-group">
                      <label htmlFor="email">LDAP Account</label>
                      <Input
                        name="email"
                        type="text"
                        className="form-control"
                        validations={[Validation.required]}
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  )
                }

                {password}

                {buttons}

              </Form>

            </div>

          </div>

        </div>
      </div>
    );
  }

}

FormComponent.propTypes = {
  submit: PropTypes.func.isRequired,
  registration: PropTypes.bool,
  loginStatus: PropTypes.shape({
    status: PropTypes.bool,
    error: PropTypes.string
  }),
  registrationStatus: PropTypes.shape({
    status: PropTypes.bool,
    error: PropTypes.string
  }),
  timeout: PropTypes.bool
};

FormComponent.defaultProps = {
  registration: false,
  timeout: false
};

export default withRouter(FormComponent);
