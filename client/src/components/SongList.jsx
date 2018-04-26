import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { isEmpty } from 'lodash';

class SongList extends Component{

    // songList(){
    //     return(
    //         <Query
    //             // pollInterval={5000}
    //             query={gql`
    //             {
    //                 songs{
    //                     title
    //                     id
    //                 }
    //             }`}
    //         >
    //             {({loading, error, data}) => {
    //                 if (loading) return <p>Loading....</p>;
    //                 if (error) return <p>Error :(</p>;
    //
    //                 return data.songs.map(({title, id}) => {
    //                     return (
    //                         <div key={id}>
    //                             <p>{title}</p>
    //                         </div>
    //                     )
    //                 })
    //             }
    //             }
    //         </Query>
    //     )
    // }

    renderSongs(){
        if(isEmpty(this.props.data)) return <div>No data fetch</div>;
        const { loading, error } = this.props.data;
        if(loading) return <p>Loading...</p>;
        if(error) return <p>Error :(</p>;

        return this.props.data.songs.map(({title, id}) => {
            return (
                <li key={id}
                    className='collection-item'
                >
                    {title}
                </li>
            )
        })
    }

    render(){
        // console.log(this.props);
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
                        className="btn-floating btn-large waves-effect waves-light red"
                        to='/song/new'
                    >
                        <i className="material-icons">add</i>
                    </Link>

                </div>
            </div>
        )
    }
}

const query = gql`
    {
        songs{
            title
            id
            }
    } 
`;

export default graphql(query)(SongList);
