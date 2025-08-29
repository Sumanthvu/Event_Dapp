import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  EventCreated,
  LevelUp,
  MetadataUpdate,
  OwnershipTransferred,
  SpecialOfferMinted,
  StakeClaimed,
  TicketPurchased,
  Transfer
} from "../generated/EventTicketing/EventTicketing"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBatchMetadataUpdateEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt
): BatchMetadataUpdate {
  let batchMetadataUpdateEvent = changetype<BatchMetadataUpdate>(newMockEvent())

  batchMetadataUpdateEvent.parameters = new Array()

  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )

  return batchMetadataUpdateEvent
}

export function createEventCreatedEvent(
  eventId: BigInt,
  organizer: Address
): EventCreated {
  let eventCreatedEvent = changetype<EventCreated>(newMockEvent())

  eventCreatedEvent.parameters = new Array()

  eventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  eventCreatedEvent.parameters.push(
    new ethereum.EventParam("organizer", ethereum.Value.fromAddress(organizer))
  )

  return eventCreatedEvent
}

export function createLevelUpEvent(user: Address, level: i32): LevelUp {
  let levelUpEvent = changetype<LevelUp>(newMockEvent())

  levelUpEvent.parameters = new Array()

  levelUpEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  levelUpEvent.parameters.push(
    new ethereum.EventParam(
      "level",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(level))
    )
  )

  return levelUpEvent
}

export function createMetadataUpdateEvent(_tokenId: BigInt): MetadataUpdate {
  let metadataUpdateEvent = changetype<MetadataUpdate>(newMockEvent())

  metadataUpdateEvent.parameters = new Array()

  metadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return metadataUpdateEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSpecialOfferMintedEvent(
  user: Address
): SpecialOfferMinted {
  let specialOfferMintedEvent = changetype<SpecialOfferMinted>(newMockEvent())

  specialOfferMintedEvent.parameters = new Array()

  specialOfferMintedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return specialOfferMintedEvent
}

export function createStakeClaimedEvent(
  eventId: BigInt,
  organizer: Address,
  amount: BigInt
): StakeClaimed {
  let stakeClaimedEvent = changetype<StakeClaimed>(newMockEvent())

  stakeClaimedEvent.parameters = new Array()

  stakeClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  stakeClaimedEvent.parameters.push(
    new ethereum.EventParam("organizer", ethereum.Value.fromAddress(organizer))
  )
  stakeClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakeClaimedEvent
}

export function createTicketPurchasedEvent(
  ticketId: BigInt,
  eventId: BigInt,
  buyer: Address,
  price: BigInt
): TicketPurchased {
  let ticketPurchasedEvent = changetype<TicketPurchased>(newMockEvent())

  ticketPurchasedEvent.parameters = new Array()

  ticketPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "ticketId",
      ethereum.Value.fromUnsignedBigInt(ticketId)
    )
  )
  ticketPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  ticketPurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  ticketPurchasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return ticketPurchasedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
