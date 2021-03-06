const functions = require("firebase-functions");
const admin = require("firebase-admin");

// initialize app
admin.initializeApp();

// send push notification
exports.sendPostMessage = functions.firestore
  .document("/Posts/{PostsId}")
  .onWrite(async (change, context) => {
    // change includes changed data in firestore
    // console.log("change: ", change);
    // context includes params
    // console.log("context: ", context);
    // get the changed data
    const data = change.after.data();
    if (data) {
      // console.log("message", data);
      // get user id from the change data
      const sender = data.writerUid;
      // get users collection
      const users = admin.firestore().collection("Users");
      // build push notification
      const payload = {
        data: {
          message: "TREBI",
          body: "New Post!"
        }
      };

      const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
      };

      await users
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //   console.log("doc.id", doc.id);
            //   console.log("sender", sender);
            //   console.log("doc", doc);
            // do not send notification to the sender
            if (doc.id !== sender) {
              // get the push token of a user
              pushToken = doc.data().pushToken;
              // console.log(pushToken);
              // console.log("token, sending message", pushToken, payload);
              // send notification trhough firebase cloud messaging (fcm)
              admin.messaging().sendToDevice(pushToken, payload, options);
              console.log("sendMessage");
            } else {
              // console.log("the sender is the same", doc.id, sender);
            }
          });
          return "sent message to all users";
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    } else {
    }
  });

exports.sendCommentMessage = functions.firestore
  .document("/Posts/{PostsID}/PostComment/{CommentId}")
  .onWrite(async (change, context) => {
    // change includes changed data in firestore
    // console.log("change: ", change);
    // context includes params
    // console.log("context: ", context);
    // get the changed data
    const data = change.after.data();
    if (data) {
      console.log("message", data);
      // get user id from the change data
      const sender = data.uid;
      // get users collection
      const maintainers = admin
        .firestore()
        .collection("Users")
        .where("level", "==", "maintainer");
      // build push notification
      const payload = {
        data: {
          message: "TREBI",
          body: "New Comment in Post"
        }
      };

      const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
      };

      await maintainers
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //   console.log("doc.id", doc.id);
            //   console.log("sender", sender);
            //   console.log("doc", doc);
            // do not send notification to the sender
            if (doc.id !== sender) {
              // get the push token of a user
              pushToken = doc.data().pushToken;
              // console.log(pushToken);
              // console.log("token, sending message", pushToken, payload);
              // send notification trhough firebase cloud messaging (fcm)
              admin.messaging().sendToDevice(pushToken, payload, options);
              console.log("sendMessage");
            } else {
              // console.log("the sender is the same", doc.id, sender);
            }
          });
          return "sent message to all users";
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    } else {
    }
  });

exports.sendPortFolioCommentMessage = functions.firestore
  .document("/TeamPost/teamPost1/TeamComment/{CommentId}")
  .onWrite(async (change, context) => {
    // change includes changed data in firestore
    // console.log("change: ", change);
    // context includes params
    // console.log("context: ", context);
    // get the changed data
    const data = change.after.data();
    if (data) {
      console.log("message", data);
      // get user id from the change data
      const sender = data.uid;
      // get users collection
      const maintainers = admin
        .firestore()
        .collection("Users")
        .where("level", "==", "maintainer");
      // build push notification
      const payload = {
        data: {
          message: "TREBI",
          body: "New Comment in Portfolio!"
        }
      };

      const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
      };

      await maintainers
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //   console.log("doc.id", doc.id);
            //   console.log("sender", sender);
            //   console.log("doc", doc);
            // do not send notification to the sender
            if (doc.id !== sender) {
              // get the push token of a user
              pushToken = doc.data().pushToken;
              // console.log(pushToken);
              // console.log("token, sending message", pushToken, payload);
              // send notification trhough firebase cloud messaging (fcm)
              admin.messaging().sendToDevice(pushToken, payload, options);
              console.log("sendMessage");
            } else {
              // console.log("the sender is the same", doc.id, sender);
            }
          });
          return "sent message to all users";
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    } else {
    }
  });
