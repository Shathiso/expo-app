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
    listingsCollectionId:"66742be60030706d3387",
    paymentsCollectionId:"66742c3000284aa3012b",
    faultsCollectionId:"66742c6d00255fe1e5e0",
    propertyPaymentsCollectionId:"667560710039c3f01526",
    propertiesCollectionId:"6677e16d0038995c1811"
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


// Get Listings
export async function getListings() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const listings = await databases.listDocuments(
      config.databaseId,
      config.listingsCollectionId,
      []
    );

    if (!listings) throw Error;

    return listings;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Register User
export const registerUser =  async (form) => {
    try {

        const username = form.name.split(" ")[0];
        const newAccount = await account.create(ID.unique(), form.email, form.password, username)
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
            username: username,
            name:form.name,
            mobile: form.mobile,
            avatar: avatarUrl,
        }
        );

      return newUser;
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// Submit House Application
export const submitHouseApplication =  async (form) => {
  try {

      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;

      const userData = await getUserData(currentAccount.$id);

      //Get the last entered Applications reference Number
      const applications = await getApplications();
      let length = applications.documents.length;
      let referenceNo = 1;
      if(length > 0) {
        referenceNo = (parseInt(applications.documents[length - 1].referenceNo) + 1);
      } 

      const data = {
        paid: true,
        user: currentAccount.$id,
        referenceNo:referenceNo,
        name:currentAccount.name,
        email:currentAccount.email,
        mobile:userData.mobile,
        dateCreated:new Date(),
        ...form
      }

      console.log('application', data);

      const newApplication = await databases.createDocument(
      config.databaseId,
      config.applicationsCollectionId,
      ID.unique(),
      { ...data }
      );

    return newApplication;
      
  } catch (error) {
      console.log(error)
      throw new Error(error)
  }
}

// Get house applications
export async function getUserApplications() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const applications = await databases.listDocuments(
      config.databaseId,
      config.applicationsCollectionId,
      [Query.equal("user", currentAccount.$id)]
    );

    if (!applications) throw Error;

    return applications.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Get user data
export async function getUserData(id) {
  try {

    const userData = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", id)]
    );

    if (!userData) throw Error;

    return userData.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get house applications
export async function getApplications() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const applications = await databases.listDocuments(
      config.databaseId,
      config.applicationsCollectionId,
      []
    );

    if (!applications) throw Error;

    return applications;
  } catch (error) {
    console.log(error);
    return null;
  }

}

// Submit Fault complaint
export const submitFault =  async (form) => {
  try {

      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;

      const imageUrl = await uploadFile(form.image.file, "image")

      //Get the last entered Fault reference Number
      const faults = await getAllFaults();


      console.log('submit fault',faults);
      let length;
      (faults.length > 0) ? length = faults.length : length = 0;

      let referenceNo;
      (length > 0) ? referenceNo = (faults[length - 1].referenceNo + 1) : referenceNo = 1;

      const data = {
        user: currentAccount.$id,
        name:currentAccount.name,
        status:'submitted',
        referenceNo:referenceNo,
        image:imageUrl,
        plotNumber:form.plotNumber,
        description:form.description,
        type:form.type,
        dateCreated:new Date(),
      }

      const newFault = await databases.createDocument(
      config.databaseId,
      config.faultsCollectionId,
      ID.unique(),
      { ...data }
      );

    return newFault;
      
  } catch (error) {
      console.log(error)
      throw new Error(error)
  } 
}

export async function getAllFaults() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const faults = await databases.listDocuments(
      config.databaseId,
      config.faultsCollectionId,
      []
    );

    if (!faults) throw Error;

    return faults.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get User Faults
export async function getUserFaults() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const faults = await databases.listDocuments(
      config.databaseId,
      config.faultsCollectionId,
      [Query.equal("user", currentAccount.$id)]
    );

    if (!faults) throw Error;

    return faults.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Store payment
export const storePayment =  async (form) => {
  try {
      const payment = await databases.createDocument(
      config.databaseId,
      config.paymentsCollectionId,
      ID.unique(),
      { ...form }
      );

    return payment;
      
  } catch (error) {
      console.log(error)
      throw new Error(error)
  }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
  
      return {session:session, error:''};
    } catch (error) {
      return {session:'', error:error};
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


// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  //const { mimeType, ...rest } = file;
  //const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      file
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      //fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get User owned properties
export async function getUserProperties() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const properties = await databases.listDocuments(
      config.databaseId,
      config.propertiesCollectionId,
      [Query.equal("owner", currentAccount.$id)]
    );

    if (!properties) throw Error;

    return properties.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get User property payments
export async function getUserPropertyPayments() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const payments = await databases.listDocuments(
      config.databaseId,
      config.propertyPaymentsCollectionId,
      [Query.equal("owner", currentAccount.$id)]
    );

    if (!payments) throw Error;

    return payments.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPropertyPayments = async () => {
  try {
    const payments = await databases.listDocuments(
      config.databaseId,
      config.propertyPaymentsCollectionId,
      []
    );

    if (!payments) throw Error;

    return payments.documents;
  } catch (error) {
    console.log(error);
    return null;
  }
}


export const storePropertyPayment =  async (form, propertyId) => {
  try {

    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;


    //Get the last entered Fault reference Number
    const payments = await getAllPropertyPayments();

    let length;
    (payments.length > 0) ? length = payments.length : length = 0;

    let referenceNo;
    (length > 0) ? referenceNo = (payments[length - 1].referenceNo + 1) : referenceNo = 1;

      const payment = await databases.createDocument(
      config.databaseId,
      config.propertyPaymentsCollectionId,
      ID.unique(),
      { 
        owner: currentAccount.$id,
        date: new Date(),
        propertyId:propertyId,
        amount:parseInt(form.amount),
        referenceNo: referenceNo
      }
      );

    return {payment:payment, error:"", success:true};
      
  } catch (error) {
    return {payment:'', error:error.message, success:false}; 
  }
}


// Get User Count
export async function getUsersCount() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      []
    );

    if (!users) throw Error;

    return users.documents.filter( user => !user.isAdmin);
  } catch (error) {
    console.log(error);
    return null;
  }
}

