const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Since this code will be running in the Cloud Functions environment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const fire = admin.firestore();

// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Firestore.
exports.onUserStatusChanged = functions.database.ref("/status/{uid}").onUpdate(
    async (change, context) => {
      // Get the data written to Realtime Database
      const evStatus = change.after.val();
      // Then use other event data to create a reference to the
      // corresponding Firestore document.
      const userStatusFirestoreRef = fire.doc(`profiles/${context.params.uid}`);
      functions.logger.log("SCHNUPPI", userStatusFirestoreRef);
      // It is likely that the Realtime Database change that triggered
      // this event has already been overwritten by a fast change in
      // online / offline status, so we"ll re-read the current data
      // and compare the timestamps.
      const statusSnapshot = await change.after.ref.once("value");
      const status = statusSnapshot.val();
      const jsonStatus = JSON.stringify(status);
      const jsonEvStatus = JSON.stringify(evStatus);
      functions.logger.log(jsonStatus, jsonEvStatus);
      // If the current timestamp for this data is newer than
      // the data that triggered this event, we exit this function.
      if (status.state_last_changed > evStatus.state_last_changed) {
        return null;
      }
      // Otherwise, we convert the state_last_changed field to a Date
      evStatus.state_last_changed = new Date(evStatus.state_last_changed);
      // ... and write it to Firestore.
      return userStatusFirestoreRef.update(evStatus);
    },
);

exports.updateDocument = functions.firestore
    .document("dates/{dateId}")
    .onUpdate((change, context) => {
      const date = change.after.data().datingDate;
      const pending = change.after.data().pending;
      const dayAfter = new Date(date);
      dayAfter.setDate(dayAfter.getDate() + 1);

      const currentDate = new Date();
      if (currentDate >= dayAfter && pending === false) {
        return fire.collection("dates").doc(context.params.dateId)
            .update({
              archived: true,
            });
      }
      return null;
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
