import { FunctionComponent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import { CodeEditor } from "../Common/CodeEditor/code-editor.component";
import { Header } from "../Common/Header/header.component";

let socket: Socket;

export const Code: FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId: string | null = searchParams.get("key");

  const [code, setCode] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const query: Record<string, any> = { userId: user.id };
    if (roomId) {
      query.roomId = roomId;
    }

    socket = io("ws://localhost:4000", { path: "/code", query });

    socket.on("connection", (room) => {
      setSearchParams({ key: room.id });
      setCode(room.code);
    });

    socket.on("code-change", (code: string) => {
      setCode(code);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleChangeCode = (value: string) => {
    socket.emit("code-change", { roomId, code: value });
  };

  return (
    <>
      <Header />
      <CodeEditor value={code} onChange={handleChangeCode} />
    </>
  );
};
