import gql from "graphql-tag";

const GET_ALL_PROJECTS = gql`
    {
        allProjects{
            edges{
                node{
                    id
                    title
                    platform
                    tags
                    likes
                }
            }
        }
    }
`

export default GET_ALL_PROJECTS;