import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  {
    allProjects {
      edges {
        node {
          id
          title
          description
          creatorUserId
          platform
          difficulty
          amountOfWork
          tags
          projectLikes {
            edges {
              node {
                userId
                projectId
              }
            }
          }
          projectBookmark {
            edges {
              node {
                userId
                projectId
              }
            }
          }
        }
      }
    }
  }
`;
