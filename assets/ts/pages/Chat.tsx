import styled from "@emotion/styled";
import { Channel, Socket } from "phoenix";
import React, { useEffect, useReducer } from "react";
import { colors } from "../Theme";

interface State {
  inputing: string;
  msgs: string[];
  channel: Channel;
}

interface Action {
  type: "join" | "input" | "send" | "msg";
  channel?: Channel;
  msg?: string;
}

interface Payload {
  body: string;
}

const reducer = (prev: State, action: Action): State => {
  switch (action.type) {
    case "join":
      return action.channel ? { ...prev, channel: action.channel } : prev;

    case "input":
      if (!action.msg) {
        return prev;
      }
      return { ...prev, inputing: action.msg };

    case "send":
      const payload: Payload = { body: prev.inputing };
      prev.channel.push("send", payload);
      return prev;

    case "msg":
      return {
        ...prev,
        msgs: [
          ...prev.msgs,
          `[${new Date().toTimeString().split(" ")[0]}] ${action.msg}`,
        ],
      };
  }
};

const MsgList = styled.ul``;

const InputBox = styled.input`
  width: 80%;
  min-width: 80%;
  max-width: 80%;
  border: 2px solid #eee;
  padding: 10px;
  font-size: 20px;
  &:focus {
    outline: none;
    border: 2px solid ${colors.elixir};
  }
`;

const Space = styled.div`
  margin-bottom: 30px;
`;

const Msg = styled.li`
  width: 80%;
  padding: 5px;
  text-align: left;
  margin: 15px auto;
  background-color: #eee;
  color: #000;
  border-radius: 5px;
`;
export default function Chat() {
  // @ts-ignore
  const init: State = { inputing: "", msgs: [], channel: null };

  const [state, dispatch] = useReducer(reducer, init);

  useEffect(() => {
    const socket = new Socket("/socket", {
      // @ts-ignore
      params: { token: window.userToken },
    });

    socket.connect();
    // Now that you are connected, you can join channels with a topic:
    const channel = socket.channel("rooms:lobby", {});
    channel.on("new_msg", (payload: Payload) =>
      dispatch({ type: "msg", msg: payload.body }),
    );

    channel
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    dispatch({ type: "join", channel });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: "send" });
  };

  return (
    <>
      <h1>Chat</h1>
      <div>
        <Space>
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputBox
              type="text"
              onChange={(e) => dispatch({ type: "input", msg: e.target.value })}
            />
          </form>
        </Space>
        <MsgList>
          {state.msgs.map((msg, i) => (
            <Msg key={`m-${i}`}>{msg}</Msg>
          ))}
        </MsgList>
      </div>
    </>
  );
}
