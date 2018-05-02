import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import addLyricToSong from '../queries/addLyricToSong';
import fetchSong from '../queries/fetchSong';
import query from '../queries/fetchSongs';
import likeLyric from "../queries/likeLyric";
import { isEmpty } from 'lodash';


class SongDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            lyric: ''
        }
    }

    componentDidMount(){

    }

    renderSongDetail(){
        if(isEmpty(this.props.fetchSong.song)) return <div>No data fetch</div>;
        const { loading, error } = this.props.fetchSong;
        if(loading) return <p>Loading...</p>;
        if(error) return <p>Error :(</p>;

        const { title } = this.props.fetchSong.song;
        const { lyrics } = this.props.fetchSong.song;

        return (
            <div className='row'>
                <div className='col s12'>
                    <h5>
                        Title: {title}
                    </h5>
                    <h6>Lyrics:</h6>
                    <ul className='lyrics-text collection'>
                        {isEmpty(lyrics) ? <p>no lyrics yet ...</p> : lyrics.map(({ id, content, likes }) => {
                            return (
                                <li className='collection-item valign-wrapper song-details_flex-container' key={id}>
                                    <div className='song-details_flex-item'>
                                        {content}
                                    </div>
                                    <div className='song-details_icon-container song-details_flex-item'>
                                        <span className="badge left song-details_likes">{likes}</span>
                                        <i className="material-icons"
                                           onClick={() => this.likeLyrics(id, likes)}
                                        >thumb_up</i>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );

    }

    handlerAnyInputChange = (event, nameInState) => {
        const value = event.target.value;
        this.setState({
                [nameInState]: value,
            })
    };


    newSongLyricSubmit = (event) => {
        event.preventDefault();
        const { lyric } = this.state;
        const { id } = this.props.match.params;
        // console.log('lyrics', lyric);
        // console.log('id', id);

        this.props.addLyricToSong({
            variables: {
                songId: id,
                content: lyric
            }
        })
            .then(() => {
                this.props.data.refetch()
            })
            .catch(e => console.log(e));

        this.setState({
            lyric: ''
        })
    };

    likeLyrics = (lyricId, likes) => {
        // console.log('test', lyricId);
        this.props.likeLyric({
            variables: {
                id: lyricId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: lyricId,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            },
            refetchQueries: [{ query }]
        })
            // .then(() => this.props.data.refetch())
            .catch(e => console.log(e))

    };

    render(){
        console.log('add lyric props', this.props);
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col s6'>
                        <h4>Song Detail</h4>
                    </div>
                    <div className='col s6 button-back'>
                        <Link className="waves-effect waves-light btn-small right blue lighten-3"
                              to='/'
                        >
                            <i className="material-icons middle">arrow_back</i>
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <form onSubmit={this.newSongLyricSubmit}
                          className='col s12'
                    >
                        <label htmlFor="">Song Lyric:</label>
                        <input type="text"
                               value={this.state.lyric}
                               placeholder='add lyric'
                               onChange={event => this.handlerAnyInputChange(event, 'lyric')}
                        />
                    </form>
                </div>
                {this.renderSongDetail()}
            </div>
        )
    }
}

export default compose(
    graphql(query, {
        name: 'data'
    }),
    graphql(fetchSong, {
        name: 'fetchSong',
        options: (props) => { return { variables: { id: props.match.params.id } } }
    }),
    graphql(addLyricToSong, {
        name: 'addLyricToSong'
    }),
    graphql(likeLyric, {
        name: 'likeLyric'
    })
)(SongDetail);