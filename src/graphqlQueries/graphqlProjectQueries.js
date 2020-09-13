import gql from "graphql-tag";

const GET_ALL_PROJECTS = gql`
{
    allProjects{
        edges{
            node{
                id
                title
                description
                platform
                difficulty
                amountOfWork
                tags
                projectLikes{
                    edges{
                        node{
                            id
                        }
                    }
                }
            }
        }
    }
}
`

export default GET_ALL_PROJECTS;