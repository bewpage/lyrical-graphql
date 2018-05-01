import gql from 'graphql-tag';

const fetchSong = gql`
        query fetchSong($id: ID!){
            song(id: $id){
                id
                title
                lyrics{
                    id
                    content
                    likes
                }
            }
        }
`;

export default fetchSong;