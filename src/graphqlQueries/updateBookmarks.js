import { gql } from '@apollo/client';

export const UPDATE_BOOKMARK = gql`
  mutation addBookmark($userId: String!, $projectId: String!) {
    addBookmark(userId: $userId, projectId: $projectId) {
      project {
        id
      }
    }
  }
`;
