import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $description: String!
    $creatorUserId: String!
    $platform: String!
    $difficulty: String!
    $amountOfWork: String!
    $tags: [String!]!
  ) {
    createProject(
      title: $title
      description: $description
      creatorUserId: $creatorUserId
      platform: $platform
      difficulty: $difficulty
      amountOfWork: $amountOfWork
      tags: $tags
    ) {
      project {
        id
      }
    }
  }
`;
