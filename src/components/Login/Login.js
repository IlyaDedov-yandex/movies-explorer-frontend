import React from "react";
import { Link, withRouter } from 'react-router-dom';
import validator from "validator";
import './Login.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            return;
        }
        this.setState({ email: '', password: '' }, () => {
            this.props.handleLogin(email, password);
        })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'email':
                emailValid = validator.isEmail(value);
                fieldValidationErrors.email = emailValid ? '' : 'Введите корректный email';
                break;
            case 'password':
                passwordValid = value.length >= 8;
                fieldValidationErrors.password = passwordValid ? '' : 'Длина пароля > 8 символов';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }
    render() {
        return (
            <section className="wrapper wrapper_type_long">
                <div className="login">
                    <div className="login__welcome">
                        <Link to="/" className="logo" />
                        <h2 className="login__welcome-title">Рады видеть!</h2>
                    </div>
                    <form className="login__form" onSubmit={this.handleSubmit}>
                        <div className="login__field">
                            <label htmlFor="email" className="login__label">E-mail</label>
                            <input required className={`login__input ${!this.state.emailValid && 'login__input_type_error'}`} name="email" placeholder="Email" type="text" onChange={this.handleChange} value={this.state.email} />
                            <span className="login__input-error">{this.state.formErrors.email}</span>
                        </div>
                        <div className="login__field">
                            <label htmlFor="password" className="login__label">Пароль</label>
                            <input required className={`login__input ${!this.state.passwordValid && 'login__input_type_error'}`} name="password" placeholder="Пароль" type="password" onChange={this.handleChange} value={this.state.password} />
                            <span className="login__input-error">{this.state.formErrors.password}</span>
                        </div>
                        <button type="submit" className={`login__btn ${!this.state.formValid && 'login__btn_type_disabled'}`} aria-label="Войти" disabled={!this.state.formValid}>Войти</button>
                    </form>
                    <div className="login__signup">
                        <p className="login__caption">Ещё не зарегистрированы?</p>
                        <Link to="/signup" className="login__link">Регистрация</Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Login);