const signupResolver = require("./mutations/signup");
const loginResolver = require("./mutations/login");
const getUsersResolver = require("./queries/getUsers");
const getPackagesResolver = require("./queries/getPackages");
const getPackageResolver = require("./queries/getPackage");
const getUsersPackagesResolver = require("./queries/getUsersPackages");
const getUserPackagesResolver = require("./queries/getUserPackages");
const getUserResolver = require("./queries/getUser");
const getUserTransHistoriesResolver = require("./queries/getUserTransHistories");
const createPackageResolver = require("./mutations/createPackage");
const updateProfileResolver = require("./mutations/updateProfile");
const changePasswordResolver = require("./mutations/changePassword");
const resetPasswordRequestResolver = require("./mutations/resetPasswordRequest");
const deletePackageResolver = require("./mutations/deletePackage");
const deleteUserResolver = require("./mutations/deleteUser");
const uploadDpResolver = require("./mutations/uploadDp");
const resetPasswordResolver = require("./mutations/resetPassword");
const sendMessageResolver = require("./mutations/sendMessage");
const createUserPackageResolver = require("./mutations/createUserPackage");
const deleteMessageResolver = require("./mutations/deleteMessage");
const addBankInfoResolver = require("./mutations/addBankInfo");
const changeRoleResolver = require("./mutations/toggleRole");
const toggleBlockResolver = require("./mutations/toggleBlock");
const sendToBalancesResolver = require("./mutations/sendToBalances");
const withdrawResolver = require("./mutations/withdraw");
const withdrawRefResolver = require("./mutations/withdrawRef");
const withdrawRoundBalResolver = require("./mutations/withdrawRound");
const getMessagesResolvers = require("./queries/getMessages");

module.exports = {
  Query: {
    ...getUsersResolver.Query,
    ...getUserResolver.Query,
    ...getPackagesResolver.Query,
    ...getPackageResolver.Query,
    ...getUsersPackagesResolver.Query,
    ...getUserPackagesResolver.Query,
    ...getUserTransHistoriesResolver.Query,
    ...getMessagesResolvers.Query,
  },
  Mutation: {
    ...signupResolver.Mutation,
    ...loginResolver.Mutation,
    ...createPackageResolver.Mutation,
    ...deletePackageResolver.Mutation,
    ...deleteUserResolver.Mutation,
    ...createUserPackageResolver.Mutation,
    ...sendMessageResolver.Mutation,
    ...uploadDpResolver.Mutation,
    ...updateProfileResolver.Mutation,
    ...changePasswordResolver.Mutation,
    ...resetPasswordResolver.Mutation,
    ...resetPasswordRequestResolver.Mutation,
    ...addBankInfoResolver.Mutation,
    ...deleteMessageResolver.Mutation,
    ...changeRoleResolver.Mutation,
    ...toggleBlockResolver.Mutation,
    ...sendToBalancesResolver.Mutation,
    ...withdrawResolver.Mutation,
    ...withdrawRefResolver.Mutation,
    ...withdrawRoundBalResolver.Mutation,
  },
};
