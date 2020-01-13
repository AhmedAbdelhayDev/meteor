import React, { Component } from "react";
import { Card, CardBody, FormGroup, Label, Spinner } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Wizard, Steps, Step } from "react-albus";
import { injectIntl } from "react-intl";
import { BottomNavigation } from "../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../components/wizard/TopNavigation";
import { Formik, Form, Field } from "formik";

class AddNewSiteWizard extends Component {
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.validateText = this.validateText.bind(this);
        this.validatePassword = this.validatePassword.bind(this);

        this.form0 = React.createRef();
        this.form1 = React.createRef();
        this.form2 = React.createRef();

        this.state = {
            bottomNavHidden: false,
            topNavDisabled: false,
            loading: false,
            fields: [
                {
                    valid: false,
                    name: "name",
                    value: ""
                },
                {
                    valid: false,
                    name: "antenna",
                    value: ""
                },
                {
                    valid: false,
                    name: "address",
                    value: ""
                },
                {
                    valid: false,
                    name: "city",
                    value: ""
                },
                {
                    valid: false,
                    name: "state",
                    value: ""
                },
                {
                    valid: false,
                    name: "zip",
                    value: ""
                },
                {
                    valid: false,
                    name: "region",
                    value: ""
                }
            ]
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state.fields,
            forms: [
                {
                    form: this.form0,
                    fields: [this.state.fields[0], this.state.fields[1]]
                },
                {
                    form: this.form1,
                    fields: [
                        this.state.fields[2],
                        this.state.fields[3],
                        this.state.fields[4],
                        this.state.fields[5],
                        this.state.fields[6]
                    ]
                }
            ]
        });
    }

    validateText(value) {
        let error;
        if (!value) {
            error = "Please enter value";
        } else if (value.length < 2) {
            error = "Value must be longer than 2 characters";
        }
        return error;
    }

    validatePassword(value) {
        let error;
        if (!value) {
            error = "Please enter your password";
        } else if (value.length < 6) {
            error = "Password must be longer than 6 characters";
        }
        return error;
    }

    hideNavigation() {
        this.setState({ bottomNavHidden: true, topNavDisabled: true });
    }

    asyncLoading() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);
    }

    onClickNext(goToNext, steps, step) {
        debugger;
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        let formIndex = steps.indexOf(step);
        let form = this.state.forms[formIndex].form.current;
        form.submitForm().then(() => {
            let orgState = this.state;
            let fields = orgState.forms[formIndex].fields;
            let valid = true;

            fields.map(field => {
                field.value = form.state.values[field.name];
                field.valid = form.state.errors[field.name] ? false : true;
                if (field.valid === false) valid = false;
            });

            orgState.forms[formIndex].fields = fields;
            this.setState({ orgState });

            if (valid) {
                goToNext();
                step.isDone = true;
                if (steps.length - 2 <= steps.indexOf(step)) {
                    this.hideNavigation();
                    this.asyncLoading();
                }
            }
        });
    }

    onClickPrev(goToPrev, steps, step) {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
    }

    render() {
        const { messages } = this.props.intl;
        return (
            <Card>
                <CardBody className="wizard wizard-default">
                    <Wizard>
                        <TopNavigation
                            className="justify-content-center"
                            disableNav={true}
                        />
                        <Steps>
                            <Step
                                id="step1"
                                name={messages["wizard.step-newsite-name-1"]}
                                desc={messages["wizard.step-newsite-desc-1"]}
                            >
                                <div className="wizard-basic-step">
                                    <Formik
                                        ref={this.form0}
                                        initialValues={{
                                            name: this.state.fields[0].value,
                                            antenna: this.state.fields[1].value
                                        }}
                                        onSubmit={() => {}}
                                    >
                                        {({ errors, touched }) => (
                                            <Form className="av-tooltip tooltip-label-right">
                                                <FormGroup>
                                                    <Label>
                                                        {messages["site.name"]}
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="name"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.name &&
                                                        touched.name && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.name}
                                                            </div>
                                                        )}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>
                                                        {
                                                            messages[
                                                                "site.antenna"
                                                            ]
                                                        }
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="antenna"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.antenna &&
                                                        touched.antenna && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.antenna}
                                                            </div>
                                                        )}
                                                </FormGroup>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </Step>
                            <Step
                                id="step2"
                                name={messages["wizard.step-newsite-name-2"]}
                                desc={messages["wizard.step-newsite-desc-2"]}
                            >
                                <div className="wizard-basic-step">
                                    <Formik
                                        ref={this.form1}
                                        initialValues={{
                                            address: this.state.fields[2].value,
                                            city: this.state.fields[3].value,
                                            state: this.state.fields[4].value,
                                            zip: this.state.fields[5].value,
                                            region: this.state.fields[6].value
                                        }}
                                        onSubmit={() => {}}
                                    >
                                        {({ errors, touched }) => (
                                            <Form className="av-tooltip tooltip-label-right error-l-75">
                                                <FormGroup>
                                                    <Label>
                                                        {
                                                            messages[
                                                                "site.address"
                                                            ]
                                                        }
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="address"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.address &&
                                                        touched.address && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.address}
                                                            </div>
                                                        )}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>
                                                        {messages["site.city"]}
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="city"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.city &&
                                                        touched.city && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.city}
                                                            </div>
                                                        )}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>
                                                        {messages["site.state"]}
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="state"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.state &&
                                                        touched.state && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.state}
                                                            </div>
                                                        )}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>
                                                        {messages["site.zip"]}
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="zip"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.zip &&
                                                        touched.zip && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.zip}
                                                            </div>
                                                        )}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label>
                                                        {
                                                            messages[
                                                                "site.region"
                                                            ]
                                                        }
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="region"
                                                        validate={
                                                            this.validateText
                                                        }
                                                    />
                                                    {errors.region &&
                                                        touched.region && (
                                                            <div className="invalid-feedback d-block">
                                                                {errors.region}
                                                            </div>
                                                        )}
                                                </FormGroup>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </Step>
                            <Step id="step3" hideTopNav={true}>
                                <div className="wizard-basic-step text-center pt-3">
                                    {this.state.loading ? (
                                        <div>
                                            <Spinner
                                                color="primary"
                                                className="mb-1"
                                            />
                                            <p>
                                                <IntlMessages id="wizard.async" />
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 className="mb-2">
                                                <IntlMessages id="wizard.content-thanks" />
                                            </h2>
                                            <p>
                                                <IntlMessages id="wizard.registered" />
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Step>
                        </Steps>
                        <BottomNavigation
                            onClickNext={this.onClickNext}
                            onClickPrev={this.onClickPrev}
                            className={
                                "justify-content-center " +
                                (this.state.bottomNavHidden && "invisible")
                            }
                            prevLabel={messages["wizard.prev"]}
                            nextLabel={messages["wizard.next"]}
                        />
                    </Wizard>
                </CardBody>
            </Card>
        );
    }
}
export default injectIntl(AddNewSiteWizard);
