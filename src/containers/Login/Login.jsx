import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userActions } from '../../actions/userActions'
import Input from '../../components/UI/Input/Input'

class Login extends Component {
    state = {
        loginForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 30
                },
                valid: false,
                touched: false,
            }
        },
        isValid: false,
    }

    checkValidity(value, rules) {
        // console.log(value,rules)
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail) {
            const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    loginHandler(e) {
        e.preventDefault();
        const formData= {}

        for( let ele in this.state.loginForm) {
            formData[ele] = this.state.loginForm[ele].value
        }

        if(this.state.isValid) {
            this.props.login(formData)
        }
        
    }

    inputChangeHandler(e, id) {
        const updatedForm = {
            ...this.state.loginForm,
            [id]: { 
                ...this.state.loginForm[id],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.loginForm[id].validation),
                touched: true,
            }
        }

        let formValid = true;
        for(let type in updatedForm) {
            formValid = updatedForm[type].valid && formValid
        }

        this.setState({ loginForm: updatedForm, isValid: formValid })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.loggedIn) {
            nextProps.history.push('/')
        }
    }

    render() {
        let errMsg = null
        if(this.props.auth.error) {
            errMsg = (<p style={{color:'red'}}>{this.props.auth.error}</p>);
        }
        
        const formElementsArray = []
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        const form = (
            formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    changed={(e) => this.inputChangeHandler(e, formElement.id)}
                />
            ))
        )
        
        return (
            <div className="input">
                <form onSubmit={(e) => this.loginHandler(e)}>
                    {form}
                    <button type="submit">Login</button>
                    {errMsg}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.authentication
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (formData) => dispatch(userActions.login(formData.username,formData.password))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);