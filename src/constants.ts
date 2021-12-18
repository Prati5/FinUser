export const Constants = {
    pattern: {
      emailPattern:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    endpointUrls: {  
        uploadFile: "finapp/upload/", 
        getData:"finapp/userdata/",
        login:"finapp/login/"
    },
    
    messages: {
        loggedIn : "Successfully LoggedIn",
        loggedOut : "Successfully Loggedout",
        fileUploaded :" File uploaded Successfully",
        failureUpload : "File could be not be uploaded",
        userNotExists : "User Doesn't exist,please try agian"

    }
}