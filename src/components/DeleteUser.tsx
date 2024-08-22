"use client";
import { useEffect, useRef } from "react";

interface DeleteUserProps {
  deleteToken: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ deleteToken }) => {
  const deleteTokensRef = useRef<() => void>(deleteToken);

  useEffect(() => {
    deleteTokensRef.current = deleteToken;
    sessionStorage.removeItem("persist:root");
  }, [deleteToken]);

  useEffect(() => {
    deleteTokensRef.current();
  }, []);

  return null;
};

export default DeleteUser;
