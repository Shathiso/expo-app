import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  

  export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.expo",
    projectId: "666e9a760032bc0cc6a3",
    storageId: "66714cd30030ab7c9362",
    databaseId: "666e9cf0001985403cb4",
    userCollectionId: "66715107003d3b3b492c",
    applicationsCollectionId: "6671512b000a7cc63c20",
  };

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId)
    .setPlatform(config.platform) 

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const registerUser =  async (form) => {
    try {
        await account.create(ID.unique(), form.email, form.password, form.username)
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(form.username);

        await signIn(form.email, form.password);

        const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email: form.email,
            username: form.username,
            avatar: avatarUrl,
        }
        );

        return newUser;
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailSession(email, password);
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
}
  
  // Get Account
export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
}
  
// Get Current User
export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
}
  
// Sign Out
export async function signOut() {
    try {
      const session = await account.deleteSession("current");
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }