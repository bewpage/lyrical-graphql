import gql from 'graphql-tag';

const addSong = gql`
        mutation addSong($title: String!){
            addSong(title: $title){
                id
                title
        }
    }
`;

export default addSong;