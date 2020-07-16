import React from 'react';
import { connect } from 'react-redux';

import { Form, FormFeedback, Spinner } from 'reactstrap';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Top } from '../../components/core';
import firebase from '../../firebase/index';

class Profile extends React.Component {
  state = {
    loading: false, //spinner制御用
  };

  _isMounted = false;

  user = {}

  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({ loading: true });
  };

  componentDidMount = () => {
    this._isMounted = true;

    this.user = firebase.auth().currentUser
    if (this.user) {
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    return (
      <div className="signin">
        <Top.ButtonAppBar />
        <Container maxWidth="sm">
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
            <p style={{ textAlign: 'center' }}>Profile</p>
            <div>{this.user.email}</div>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={(values) => this.handleOnSubmit(values)}
              validationSchema={Yup.object().shape({
                name: Yup.string().required(),
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
                    <InputLabel for="name">Name</InputLabel>
                    <Input
                      type="name"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.profile && errors.name ? true : false}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
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
                      登録
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ events: state.user });

export default connect(mapStateToProps, null)(Profile);
