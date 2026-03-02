import Time "mo:core/Time";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";



actor {
  type GuestMessage = {
    id : Nat;
    name : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  module GuestMessage {
    public func fromTuple(tuple : (Nat, GuestMessage)) : GuestMessage {
      tuple.1;
    };
  };

  let messages = Map.empty<Nat, GuestMessage>();
  var nextId = 0;

  public shared ({ caller }) func submitMessage(name : Text, message : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let guestMessage : GuestMessage = {
      id;
      name;
      message;
      submittedAt = Time.now();
    };

    messages.add(id, guestMessage);
    id;
  };

  public query ({ caller }) func getAllMessages() : async [GuestMessage] {
    messages.toArray().map(GuestMessage.fromTuple);
  };

  public query ({ caller }) func getMessageCount() : async Nat {
    messages.size();
  };

  public shared ({ caller }) func deleteMessage(id : Nat) : async () {
    if (not messages.containsKey(id)) {
      Runtime.trap("Message not found");
    };
    messages.remove(id);
  };
};
