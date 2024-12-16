import React, { useState } from "react";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    uploadBytes,
} from "firebase/storage";
import { storage } from "../configs/config.js";
import { v4 } from "uuid";
const useHookUploadImage = () => {
    const UploadImage = async (file) => {
        const storageRef = ref(storage, `files/${v4()}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    };
    return { UploadImage };
};

export default useHookUploadImage;
