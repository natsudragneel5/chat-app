import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      let userRef;
      let userStatusRef;
      const authUnsub = auth.onAuthStateChanged((authObj) => {
        if (authObj) {
          userStatusRef = database.ref(`/status/${authObj.uid}`);
          userRef = database.ref(`/profiles/${authObj.uid}`);
          userRef.on("value", (snap) => {
            const { name, createdAt, avatar } = snap.val();
            const data = {
              name,
              createdAt,
              avatar,
              uid: authObj.uid,
              email: authObj.email,
            };
            setProfile(data);
            setIsLoading(false);
          });

          database.ref(".info/connected").on("value", (snapshot) => {
            // If we're not currently connected, don't do anything.
            if (!!snapshot.val() === false) {
              return;
            }
            userStatusRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(() => {
                userStatusRef.set(isOnlineForDatabase);
              });
          });
        } else {
          if (userRef) {
            userRef.off();
          }
          if (userStatusRef) {
            userStatusRef.off();
          }
          database.ref(".info/connected").off();
          setProfile(null);
          setIsLoading(false);
        }
      });
      return () => {
        authUnsub();
        if (userRef) {
          userRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
        database.ref(".info/connected").off();
      };
    }, // eslint-disable-next-line
    []
  );
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
