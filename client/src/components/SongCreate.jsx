import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SongCreate extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            formValid: false,
            titleValid: false,
            formErrors: {title: ''}
        }
    }

    handlerAnyInputChange = (event, nameInState) => {
        const value = event.target.value;
        this.setState({
            [nameInState]: value,
        },
            () => {this.validateField(nameInState, value)})
    };

    validateField(fieldName, value){
        let fieldValidationErrors = this.state.formErrors;
        let { titleValid } = this.state;

        switch(fieldName){
            case 'title':
                titleValid = value.length >= 3;
                fieldValidationErrors.title = titleValid ? '' : ' is too short';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            titleValid
        }, this.validateForm);
    }

    validateForm(){
        this.setState({
            formValid: this.state.titleValid
        })
    }

    newSongTitleSubmit = (event) => {
        event.preventDefault();
        console.log('new title is:', this.state.title);


        this.setState({
            title: ''
        })
    };


    render(){
        return(
            <div className='container'>
                <h3>Create a new song</h3>
                <div className='row'>
                    <div className='col s12'>
                        <form onSubmit={this.newSongTitleSubmit}>
                            <label htmlFor="inputSongTitle">Song Title:</label>
                            <input type="text"
                                   value={this.state.title}
                                   onChange={event => this.handlerAnyInputChange(event, 'title')}
                                   placeholder='add title'
                            />
                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                                disabled={!this.state.formValid}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <Link className="waves-effect waves-light btn"
                              to='/'
                        >
                            <i className="material-icons left">arrow_back</i>
                            Song List
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default SongCreate;