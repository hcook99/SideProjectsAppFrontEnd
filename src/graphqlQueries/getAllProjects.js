import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  query allProjects(
    $title: String!
    $description: String!
    $tags: String!
    $platforms: [String]
    $difficulties: [String]
    $amountOfWork: [String]
    $limit: Int!
    $after: String!
  ) {
    allProjects(
      filters: {
        or: [{titleIlike: $title}, {descriptionIlike: $description}, {tagsIlike: $tags}]
        platformsContains: $platforms
        difficultyArray: $difficulties
        amountOfWorkArray: $amountOfWork
      }
      first: $limit
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          title
          description
          creatorUserId
          platforms
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
