import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';
import { isEmpty } from 'lodash';


class SongDetail extends Component{

    renderSongDetail(){
        const { id } = this.props.match.params;
        if(isEmpty(this.props.data)) return <div>No data fetch</div>;
        const { loading, error } = this.props.data;
        if(loading) return <p>Loading...</p>;
        if(error) return <p>Error :(</p>;

        const test = this.props.data.songs.filter(obj => {
            return obj.id === id;
        });

        return (
            <div>
                <h5>
                    Title: {test[0].title}
                </h5>
            </div>
        );

    }

    render(){
        console.log('this.props song details', this.props);
        console.log('this.props song id', this.props.match.params);
        return(
            <div className='container'>
                <h4>Song Detail</h4>
                <Link className="waves-effect waves-light btn"
                      to='/'
                >
                    <i className="material-icons left">arrow_back</i>
                    Back
                </Link>
                {this.renderSongDetail()}
            </div>
        )
    }
}

export default graphql(query)(SongDetail);