import React from "react";
import './FilterCheckbox.css';
class FilterCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { name } = event.target;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="filter-checkbox">
                <input className="filter-checkbox__input" type="checkbox" name="isGoing" id="filter-checkbox" checked={this.state.isGoing}
                    onChange={this.handleInputChange} />
                <label htmlFor="filter-checkbox" className="filter-checkbox__label"></label>
                <p className="filter-checkbox__caption">Короткометражки</p>
            </div>
        );
    }
}
export default FilterCheckbox;