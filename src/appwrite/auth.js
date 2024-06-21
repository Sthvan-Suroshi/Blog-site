import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// Read documentation from appwrite to know wt parameters are required to operate on methods.

export class AuthService {
  client = new Client();
  account;
  // account needs client first..so instead of creating new object here we will create account whenever client is called to save resources

  // constructor because whenever new object is created constructor will be called and then endpoints are created to save resources
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  //wrapper to create account , login, current status, logout
  async createAccount(
    { email, password, name } // destructuring parameters
  ) {
    try {
      const userAccount = await this.account.create(
        ID.unique(), // to create unique ID
        email,
        password,
        name
      );

      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null; // because if some problem occurs then it will atleast return some value so tht program doesn't stop
  }

  async logout() {
    try {
      await this.account.deleteSessions(); // delete session and delete sessions are different. Sessions logouts from all devices and session logouts from present device
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;

//* class based and separate methods are created because if in future we want to change our backend service then we can make few changes and make the code run whereas if we follow docs then it will only work for appwrite services only
