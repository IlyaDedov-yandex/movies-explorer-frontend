import React from "react";
import { Link, withRouter } from 'react-router-dom';
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            logoImage: require('../../images/logo/logo.png')
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const { email, value } = e.target;
        this.setState({
            [email]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { name, email, password } = this.state;
        if (!email || !password || !name) {
            return;
        }
        this.setState({ email: '', password: '' }, () => {
            this.props.handleLogin(email, password);
        })
    }
    render() {
        return (
            <section className="wrapper wrapper_type_long">
                <div className="login">
                    <div className="login__welcome">
                        <Link to="/profile" className="logo" />
                        <h2 className="login__welcome-title">Добро пожаловать!</h2>
                    </div>
                    <form className="login__form" onSubmit={this.handleSubmit}>
                        <div className="login__field">
                            <label htmlFor="password" className="login__label">Имя</label>
                            <input required className="login__input" name="name" placeholder="Имя" type="text" onChange={this.handleChange} value='Виталий' />
                            <span className="login__input-error"></span>
                        </div>
                        <div className="login__field">
                            <label htmlFor="email" className="login__label">E-mail</label>
                            <input required className="login__input" name="email" placeholder="Email" type="text" onChange={this.handleChange} value='pochta@yandex.ru' />
                            <span className="login__input-error"></span>
                        </div>
                        <div className="login__field">
                            <label htmlFor="password" className="login__label">Пароль</label>
                            <input required className="login__input login__input_type_error" name="password" placeholder="Пароль" type="password" onChange={this.handleChange} value='dfdsfewfew' />
                            <span className="login__input-error">Что-то пошло не так...</span>
                        </div>
                        <button type="submit" className="login__btn">Зарегистрироваться</button>
                    </form>
                    <div className="login__signup">
                        <p className="login__caption">Уже зарегистрированы?</p>
                        <Link to="/signin" className="login__link">Войти</Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Register);