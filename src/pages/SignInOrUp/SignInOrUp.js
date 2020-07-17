import React from 'react';
import {
  Form,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { Top } from '../../components/core';
import { signIn } from '../../redux/actions/auth';

class SignInOrUp extends React.Component {
  state = {
    loading: false, //spinner制御用
  };

  _isMounted = false;

  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({ loading: true });
    //サインイン（ログイン）処理
    console.log(values);
    this.props.signIn(values);
    this.props.history.push('/');
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    return (
      <div className="signup">
        <Top.ButtonAppBar />
        <Container>
          <div
            className="mx-auto"
            style={{
              width: 400,
              background: '#eee',
              padding: 20,
              margin: 'auto',
              marginTop: 60,
            }}
          >
            <p style={{ textAlign: 'center' }}>サインイン</p>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => this.handleOnSubmit(values)}
              validationSchema={Yup.object().shape({
                email: Yup.string().email(),
                password: Yup.string().required(),
              })}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <InputLabel for="email">Email</InputLabel>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.email && errors.email ? true : false}
                    />
                    <FormFeedback>{errors.email}</FormFeedback>
                  </FormGroup>
                  <FormGroup style={{ marginTop: '1em' }}>
                    <InputLabel for="password">Password</InputLabel>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        touched.password && errors.password ? true : false
                      }
                    />
                    <FormFeedback>{errors.password}</FormFeedback>
                  </FormGroup>
                  <div style={{ textAlign: 'center', marginTop: '1em' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={this.state.loading}
                    >
                      <Spinner
                        size="sm"
                        color="light"
                        style={{ marginRight: 5 }}
                        hidden={!this.state.loading}
                      />
                      ログイン
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div
            style={{
              width: 400,
              background: '#fff',
              padding: 20,
              textAlign: 'center',
              margin: 'auto',
            }}
          >
            <Link to="/signup">新規登録はこちら</Link>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (values) => dispatch(signIn(values)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInOrUp);
