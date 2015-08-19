defmodule ThereYouAre.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", auth_msg, socket) do
    {:ok, socket}
  end

  #def join("rooms:" <> _private_room_id, _auth_msg, socket) do
    #{:error, %{reason: "unauthorized"}}
  #end

  def handle_in("new_location", %{"body" => body}, socket) do
    broadcast! socket, "new_location", %{body: body}
    {:noreply, socket}
  end
end
