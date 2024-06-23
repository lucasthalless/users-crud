import { gql } from 'graphql-tag';

// User entity
export const getUsersWithoutSettings = gql`
  {
    getUsers {
      id
      name
      email
      password
    }
  }
`;

export const getUserWithoutSettings = (id: number) => gql`
  {
    getUser(id: ${id}) {
      id
      name
      email
      password
    }
  }
`;

export const getUser = (id: number) => gql`
  {
    getUser(id: ${id}) {
      id
      name
      email
      password
      settings {
        userId
        receiveEmails
        receiveNotifications
      }
    }
  }
`;

export const createUserMutation = (
  name: string,
  email: string,
  password: string,
) => gql`
  mutation {
    createUser(
      createUserInput: {
        name: "${name}"
        email: "${email}"
        password: "${password}"
      }
    ) {
      id
      name
      email
      password
    }
  }
`;

export const updateUser = (
  id: number,
  name: string,
  email: string,
  password: string,
) => gql`
  mutation {
    updateUser(
      id: ${id}
      updateUserInput: {
        name: "${name}"
        email: "${email}"
        password: "${password}"
      }
    ) {
      id
      name
      email
      password
      settings {
        userId
        receiveEmails
        receiveNotifications
      }
    }
  }
`;

export const removeUser = (id: number) => gql`
  mutation {
    removeUser(id: ${id})
  }
`;

// UserSettings entity
export const createUserSettings = (
  id: number,
  receiveEmails: boolean,
  receiveNotifications: boolean,
) => gql`
  mutation {
    createUserSettings(
      createUserSettingsInput: {
        userId: ${id}
        receiveEmails: ${receiveEmails}
        receiveNotifications: ${receiveNotifications}
      }
    ) {
      userId
      receiveEmails
      receiveNotifications
    }
  }
`;

export const updateUserSettings = (
  id: number,
  receiveEmails: boolean,
  receiveNotifications: boolean,
) => gql`
  mutation {
    updateUserSettings(
      userId: ${id}
      updateUserSettingsInput: {
        receiveEmails: ${receiveEmails}
        receiveNotifications: ${receiveNotifications}
      }
    ) {
      userId
      receiveEmails
      receiveNotifications
    }
  }
`;
