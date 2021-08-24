const {gql} = require("apollo-server");
const typeDefs = gql`
  type File {
    url: String!
  }
  type Success {
    message: String!
  }
  type TransHistories {
    title: String!
    amount: String!
    date: String!
    userId: String!
  }
  type Referred {
    id: ID!
    phone: String!
    fullName: String!
  }
  type Inbox {
    id: ID!
    firstName: String!
    role: String!
    message: String!
    userId: String!
    sentAt: String!
  }
  type ValidRefs {
    phone: String!
    amount: Int!
  }
  type Withdraw {
    id: ID!
    title: String!
    amount: String!
    requestDate: String!
  }
  type BankInfoType {
    accountName: String!
    accountNumber: String!
    accountType: String!
    bankName: String!
    addedAt: String!
  }
  type User {
    id: ID!
    image: String!
    token: String
    userName: String!
    firstName: String!
    middleName: String!
    lastName: String!
    gender: String!
    country: String!
    state: String!
    email: String!
    phone: String!
    role: String!
    referredBy: String!
    password: String!
    balance: Int!
    round5Bal: Int!
    round5Count: Int!
    round5IWithDCount: Int!
    warnCount: Int!
    referralBalance: Int!
    payedRef: String!
    referred: [Referred]!
    inbox: [Inbox]!
    validRefs: [ValidRefs]!
    withdraw: [Withdraw]!
    bankInfo: BankInfoType!
    blackListed: Boolean!
    active: Boolean!
    resetToken: String!
    createdAt: String!
  }

  input Signup {
    userName: String!
    firstName: String!
    middleName: String!
    lastName: String!
    gender: String!
    state: String!
    email: String!
    phone: String!
    referredBy: String!
    password: String!
    confirmPassword: String!
  }

  input Login {
    userName: String
    phone: String
    password: String!
  }

  type Sales {
    id: ID!
    userName: String!
    joinedOn: String!
    amount: Int!
    userId: String!
  }

  input createPackage {
    packageName: String!
    image: String!
    payDuration: String!
    description: String!
    interest: String!
  }

  type Package {
    id: ID!
    packageName: String!
    image: String!
    payDuration: String!
    description: String!
    interest: String!
    active: Boolean!
    sales: [Sales]!
    createdAt: String!
  }

  type UserPackage {
    id: ID!
    packageName: String!
    image: String!
    amount: Int!
    duration: String!
    interest: String!
    payDay: String!
    endDayVal: String!
    active: Boolean!
    userId: ID!
    createdAt: String!
  }

  type Query {
    getUsers: [User]!
    getUser(userId: ID!): User!
    getPackages: [Package]!
    getUsersPackages: [UserPackage]!
    getUserPackages: [UserPackage]!
    getPackage(packageId: String!): Package!
    getUserTransHistories: [TransHistories]!
    messages: [Inbox]!
  }

  type Mutation {
    createUser(userInput: Signup!): User!
    login(emailOrPhone: String!, password: String!): User!
    createPackage(userInput: createPackage): Package!
    deletePackage(packageId: String!): User!
    createUserPackage(packageId: String!, amount: Int!): UserPackage!
    uploadDp(file: Upload): File!
    deleteUser(userId: String!): User!
    sendMessage(userId: String!, message: String!): User!
    updateProfile(
      firstName: String!
      middleName: String!
      lastName: String!
      state: String!
      firstName: String!
    ): User!
    changePassword(prevPassword: String!, newPassword: String!): User!
    resetPassword(
      email: String!
      token: String!
      newPassword: String!
      confirmPassword: String!
    ): User!
    resetPasswordRequest(email: String!): User!
    addBankInfo(
      accountName: String!
      accountNumber: String!
      accountType: String!
      bankName: String!
    ): User!
    deleteMessage(userId: String!, messageId: String!): User!
    changeRole(userId: String!): User!
    toggleBlock(userId: String!): User!
    sendToBalances(packageId: String!, amount: Int!): User!
    withdraw(amount: Int!): User!
    withdrawRef(amount: Int!): User!
    withdrawRoundBal(amount: Int!): User!
  }
`;
module.exports = typeDefs;
