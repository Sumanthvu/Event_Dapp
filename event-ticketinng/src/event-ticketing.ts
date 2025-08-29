import {
  EventCreated,
  TicketPurchased,
  LevelUp,
  SpecialOfferMinted,
  StakeClaimed,
  EventTicketing // Import the contract class for static calls
} from "../generated/EventTicketing/EventTicketing";
import {
  Event,
  Ticket,
  User,
} from "../generated/schema";
import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";

// Helper function to map enum to string
function levelEnumToString(level: i32): string {
  if (level === 1) return "Bronze";
  if (level === 2) return "Silver";
  if (level === 3) return "Gold";
  if (level === 4) return "Platinum";
  return "None";
}

export function handleEventCreated(event: EventCreated): void {
  // Use event ID as the entity ID
  let eventId = event.params.eventId.toString();
  let entity = new Event(eventId);
  
  // Directly get data from the event params
  entity.eventId = event.params.eventId;
  entity.organizer = event.params.organizer;
  
  // Use a static call to the contract to fetch the struct data
  let contract = EventTicketing.bind(event.address);
  let eventDataResult = contract.try_events(event.params.eventId);

  if (!eventDataResult.reverted) {
  let eventData = eventDataResult.value;
  entity.name = eventData.value1;
  entity.description = eventData.value2;
  entity.date = eventData.value3;
  entity.venue = eventData.value4;
  entity.imageIPFS = eventData.value5;
  entity.totalTickets = eventData.value6;
  entity.baseTicketPrice = eventData.value7;
  entity.soldTickets = eventData.value8;
  // entity.organizer is value9, but you already have it from the event params.
  entity.stakesClaimed = eventData.value10; // Correct index for stakesClaimed
  entity.stakeAmount = eventData.value11; // Correct index for stakeAmount
}else {
    // Log a warning if the static call reverts
    log.warning("Static call for Event data reverted for event ID {}", [eventId]);
  }

  entity.save();
}

export function handleTicketPurchased(event: TicketPurchased): void {
  let ticketId = event.params.ticketId.toString();
  let eventId = event.params.eventId.toString();
  let buyerAddress = event.params.buyer.toHexString();
  
  // Load Event entity and increment soldTickets
  let eventEntity = Event.load(eventId);
  if (eventEntity) {
    eventEntity.soldTickets = eventEntity.soldTickets.plus(BigInt.fromI32(1));
    eventEntity.save();
  }

  // Load or create the User entity
  let user = User.load(buyerAddress);
  if (!user) {
    user = new User(buyerAddress);
    user.ticketsBought = BigInt.fromI32(0);
    user.specialOfferCount = BigInt.fromI32(0);
    user.userTickets = [];
  }
  user.ticketsBought = user.ticketsBought.plus(BigInt.fromI32(1));

  // Update user level based on total tickets bought
  let totalTickets = user.ticketsBought.toI32();
  let newLevel: string;
  if (totalTickets < 3) newLevel = "Bronze";
  else if (totalTickets < 6) newLevel = "Silver";
  else if (totalTickets < 10) newLevel = "Gold";
  else newLevel = "Platinum";
  user.level = newLevel;

  // Add the new ticketId to the user's tickets array
  let userTickets = user.userTickets;
  userTickets.push(event.params.ticketId);
  user.userTickets = userTickets;
  
  user.save();
  
  // Create the new Ticket entity
  let ticketEntity = new Ticket(ticketId);
  ticketEntity.ticketId = event.params.ticketId;
  ticketEntity.eventId = event.params.eventId;
  ticketEntity.ticketNumber = eventEntity ? eventEntity.soldTickets.minus(BigInt.fromI32(1)) : BigInt.fromI32(0);
  ticketEntity.owner = event.params.buyer;
  ticketEntity.pricePaid = event.params.price;
  ticketEntity.save();
}

export function handleLevelUp(event: LevelUp): void {
  // The level is already handled in handleTicketPurchased, so this handler
  // serves as a useful logging/tracking mechanism if needed.
}

export function handleSpecialOfferMinted(event: SpecialOfferMinted): void {
  let user = User.load(event.params.user.toHexString());
  if (!user) {
    // This case shouldn't happen if handleTicketPurchased is always called first
    user = new User(event.params.user.toHexString());
    user.ticketsBought = BigInt.fromI32(0);
    user.specialOfferCount = BigInt.fromI32(0);
    user.userTickets = [];
    user.level = "None";
  }
  user.specialOfferCount = user.specialOfferCount.plus(BigInt.fromI32(1));
  user.save();
}

export function handleStakeClaimed(event: StakeClaimed): void {
  // Optional: Update the Event entity's 'stakesClaimed' status
  let eventEntity = Event.load(event.params.eventId.toString());
  if (eventEntity) {
    eventEntity.stakesClaimed = true;
    eventEntity.save();
  }
}