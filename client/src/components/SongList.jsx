import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import { isEmpty } from 'lodash';
import query from '../queries/fetchSongs';
import deleteSong from '../queries/deleteSong';


class SongList extends Component{



    renderSongs(){
        if(isEmpty(this.props.query)) return <div>No data fetch</div>;
        const { loading, error } = this.props.query;
        if(loading) return <p>Loading...</p>;
        if(error) return <p>Error :(</p>;

        return this.props.query.songs.map(({title, id}) => {
            return (
                <li key={id}
                    className='collection-item'
                >
                    <Link to={`${this.props.match.url}song/${id}`}
                          className='collection-item_link'
                    >
                        {title}
                        </Link>
                    <a className="btn-floating btn-small waves-effect waves-light blue right"
                       onClick={() => this.songToDelete(id)}
                    >
                        <i className="material-icons">delete</i>
                    </a>

                </li>
            )
        })
    }


    songToDelete = (id) => {
        console.log('song to delete', id);
        this.props.deleteSong({
            variables: {
                id
            }
        })
            .then(() => {
                this.props.query.refetch()
            })
            .catch((e) => console.log(e))

    };

    render(){
        console.log(this.props);
        return(
            <div className='container'>
                <h4>
                    Song List
                </h4>
                <div>
                    <ul className='collection'>
                        {/*{this.songList()}*/}
                        {this.renderSongs()}
                    </ul>
                    <Link
                        className="btn-floating btn-medium waves-effect waves-light red right"
                        to='/song/new'
                    >
                        <i className="material-icons">add</i>
                    </Link>

                </div>
            </div>
        )
    }
}


export default compose(
    graphql(deleteSong, {
        name: 'deleteSong'
    }),
    graphql(query, {
        name: 'query'
    })
)(SongList);
