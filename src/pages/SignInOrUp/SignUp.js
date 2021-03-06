import React from 'react';
// import { Form } from 'react-bootstrap';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase/index';

class SignUp extends React.Component {
  state = {
    loading: false, //処理中にボタンにspinner表示する制御用
  };

  _isMounted = false;

  //Submitされたら
  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({ loading: true });
    //新規登録処理
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        //正常終了時
        //spinner表示終了
        if (this._isMounted) this.setState({ loading: false });
        //Homeに移動
        this.props.history.push('/'); //history.pushを使うためwithRouterしている
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
      <div className="container">
        <div
          className="mx-auto"
          style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}
        >
          <p style={{ textAlign: 'center' }}>新規登録</p>
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
                  <Label for="name">Email</Label>
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
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.password && errors.password ? true : false}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <div style={{ textAlign: 'center' }}>
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
                    新規登録
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className="mx-auto"
          style={{ width: 400, background: '#fff', padding: 20 }}
        >
          <Link to="/signin">ログインはこちら</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
