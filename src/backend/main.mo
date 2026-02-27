import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";

actor {
  type RSVP = {
    id : Nat;
    name : Text;
    email : Text;
    attending : Bool;
    mealPreference : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  module RSVP {
    public func fromTuple(tuple : (Nat, RSVP)) : RSVP {
      tuple.1;
    };
  };

  let rsvpMap = Map.empty<Nat, RSVP>();
  var nextId = 0;

  public shared ({ caller }) func submitRSVP(name : Text, email : Text, attending : Bool, mealPreference : Text, message : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let rsvp : RSVP = {
      id;
      name;
      email;
      attending;
      mealPreference;
      message;
      submittedAt = Time.now();
    };

    rsvpMap.add(id, rsvp);
    id;
  };

  public query ({ caller }) func getAllRSVPs() : async [RSVP] {
    rsvpMap.toArray().map(RSVP.fromTuple);
  };

  public query ({ caller }) func getRSVPCount() : async {
    total : Nat;
    attending : Nat;
    notAttending : Nat;
  } {
    var attendingCount = 0;
    var notAttendingCount = 0;

    rsvpMap.forEach(
      func(_id, rsvp) {
        if (rsvp.attending) {
          attendingCount += 1;
        } else {
          notAttendingCount += 1;
        };
      }
    );

    {
      total = rsvpMap.size();
      attending = attendingCount;
      notAttending = notAttendingCount;
    };
  };

  public shared ({ caller }) func deleteRSVP(id : Nat) : async () {
    if (not rsvpMap.containsKey(id)) {
      Runtime.trap("RSVP not found");
    };
    rsvpMap.remove(id);
  };
};
