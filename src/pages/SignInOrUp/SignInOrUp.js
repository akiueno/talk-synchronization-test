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

import { Top } from '../../components/core';
import firebase from '../../firebase/index';

class SignInOrUp extends React.Component {
  state = {
    loading: false, //spinner制御用
  };

  _isMounted = false;

  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({ loading: true });
    //サインイン（ログイン）処理
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        //正常終了時
        this.props.history.push('/');
        if (this._isMounted) this.setState({ loading: false });
      })
      .catch((error) => {
        //異常終了時
        if (this._isMounted) this.setState({ loading: false });
        alert(error);
      });
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
                email: Yup.string().email().required(),
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

export default withRouter(SignInOrUp);
