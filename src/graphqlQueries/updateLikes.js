import { gql } from '@apollo/client';

export const UPDATE_LIKE = gql`
  mutation addLike($userId: String!, $projectId: String!) {
    addLike(userId: $userId, projectId: $projectId) {
      project {
        id
      }
    }
  }
`;
