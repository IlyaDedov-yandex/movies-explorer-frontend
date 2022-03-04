import React from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { withRouter } from 'react-router-dom';
import validator from "validator";
import './Profile.css';
class Profile extends React.Component {
    static contextType = CurrentUserContext;
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            email: this.props.email,
            formErrors: { name: '', email: '' },
            nameValid: true,
            emailValid: true,
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
        const { name, email } = this.state;
        if (!name || !email) {
            return;
        }
        this.setState({ name: name, email: email }, () => {
            this.props.handleUpdateUserInfo(name, email);
        })
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        switch (fieldName) {
            case 'name':
                nameValid = value.match(/[\wа-я\sё-]/gi);
                fieldValidationErrors.name = nameValid ? '' : 'Имя должно содержить латиницу, кириллицу, тире и пробел';
                break;
            case 'email':
                emailValid = validator.isEmail(value);
                fieldValidationErrors.email = emailValid ? '' : 'Введите корректный email';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameValid && this.state.emailValid });
    }
    render() {
        return (
            <>
                <this.props.header loggedIn={this.props.loggedIn} />
                <section className="wrapper wrapper_type_medium">
                    <div className="profile">
                        <h2 className="profile__welcome-title">Привет, {this.state.name}!</h2>
                        <form className="profile__form" onSubmit={this.handleSubmit}>
                            <div className="profile__field">
                                <label htmlFor="name" className="profile__label">Имя</label>
                                <input required className={`profile__input ${!this.state.nameValid && 'profile__input_type_error'}`} name="name" placeholder="Имя" type="text" onChange={this.handleChange} value={this.state.name} />
                            </div>
                            <hr className="profile__line" />
                            <div className="profile__field">
                                <label htmlFor="email" className="profile__label">E-mail</label>
                                <input required className={`profile__input ${!this.state.emailValid && 'profile__input_type_error'}`} name="email" placeholder="E-mail" type="text" onChange={this.handleChange} value={this.state.email} />
                            </div>
                            <button type="submit" className={`profile__btn ${!this.state.formValid && 'profile__btn_type_disabled'}`} aria-label="Редактировать профайл" disabled={!this.state.formValid}>Редактировать</button>
                            <p className="profile__link" onClick={this.props.handleSignOut}>Выйти из аккаунта</p>
                        </form>
                    </div>
                </section>
            </>
        )
    }
}

export default withRouter(Profile);