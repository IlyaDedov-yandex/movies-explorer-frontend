import React from "react";
import { Link, withRouter } from 'react-router-dom';
import './Profile.css';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            email: this.props.email
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { name, email } = this.state;
        if (!name || !email) {
            return;
        }
        this.setState({ name: name, email: email }, () => {
            this.props.handleLogin(name, email);
        })
    }
    render() {
        return (
            <section className="wrapper wrapper_type_medium">
                <div className="profile">
                    <h2 className="profile__welcome-title">Привет, {this.state.name}!</h2>
                    <form className="profile__form" onSubmit={this.handleSubmit}>
                        <div className="profile__field">
                            <label htmlFor="name" className="profile__label">Имя</label>
                            <input required className="profile__input" name="name" placeholder="Имя" type="text" onChange={this.handleChange} value={this.state.name} />
                        </div>
                        <hr className="profile__line" />
                        <div className="profile__field">
                            <label htmlFor="email" className="profile__label">E-mail</label>
                            <input required className="profile__input" name="email" placeholder="E-mail" type="text" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        <button type="submit" className="profile__btn" aria-label="Редактировать профайл">Редактировать</button>
                        <Link to="/signout" className="profile__link">Выйти из аккаунта</Link>
                    </form>
                </div>
            </section>
        )
    }
}

export default withRouter(Profile);