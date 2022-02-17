import React from "react";
import { Link, withRouter } from 'react-router-dom';
import './Login.css';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const { email, password } = this.state;
        if (!email || !password) {
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
                        <h2 className="login__welcome-title">Рады видеть!</h2>
                    </div>
                    <form className="login__form" onSubmit={this.handleSubmit}>
                        <div className="login__field">
                            <label htmlFor="email" className="login__label">E-mail</label>
                            <input required className="login__input" name="email" placeholder="Email" type="text" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <div className="login__field">
                            <label htmlFor="password" className="login__label">Пароль</label>
                            <input required className="login__input" name="password" placeholder="Пароль" type="password" onChange={this.handleChange} value={this.state.password} />
                        </div>
                        <button type="submit" className="login__btn">Войти</button>
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