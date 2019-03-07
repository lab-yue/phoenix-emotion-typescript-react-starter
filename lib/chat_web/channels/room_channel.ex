defmodule ChatWeb.RoomChannel do
  use Phoenix.Channel
  require Logger

  def join("rooms:lobby", _message, socket) do
    {:ok, socket}
  end


  def handle_info({:after_join, msg}, socket) do
    broadcast! socket, "user:entered", %{user: msg["user"]}
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def terminate(reason, _socket) do
    Logger.debug"> leave #{inspect reason}"
    :ok
  end

  def handle_in("send", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end

  intercept ["user_joined"]

  def handle_out("user_joined", msg, socket) do
      push(socket, "user_joined", msg)
      {:noreply, socket}
  end

end
