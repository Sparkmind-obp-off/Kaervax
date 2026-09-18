const DOMAIN_OWNER = 'KAERVAX'

export const EvidenceClass = Object.freeze({
  OBSERVED: 'OBSERVED',
  DERIVED: 'DERIVED',
  SYNTHETIC: 'SYNTHETIC',
})

export const EntityType = Object.freeze({
  SOURCE: 'Source',
  DEMAND_SIGNAL: 'DemandSignal',
  OPPORTUNITY: 'Opportunity',
  OFFER: 'Offer',
  ACTION: 'Action',
  CONVERSATION: 'Conversation',
  TRANSACTION: 'Transaction',
  DELIVERY: 'Delivery',
  LEARNING: 'Learning',
  CONNECTOR: 'Connector',
  CONNECTOR_EXECUTION: 'ConnectorExecution',
  AUDIT_EVENT: 'AuditEvent',
})

export const StatefulEntityTypes = Object.freeze(
  Object.values(EntityType).filter((entityType) => entityType !== EntityType.AUDIT_EVENT),
)

export const States = Object.freeze({
  Source: Object.freeze(['ACTIVE', 'INACTIVE']),
  DemandSignal: Object.freeze(['CAPTURED', 'QUALIFIED', 'REJECTED']),
  Opportunity: Object.freeze(['DRAFT', 'APPROVED', 'REJECTED', 'CLOSED']),
  Offer: Object.freeze(['DRAFT', 'APPROVED', 'WITHDRAWN', 'EXPIRED']),
  Action: Object.freeze(['PROPOSED', 'APPROVED', 'DENIED', 'CANCELLED']),
  Conversation: Object.freeze(['OPEN', 'CLOSED']),
  Transaction: Object.freeze(['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED']),
  Delivery: Object.freeze(['PENDING', 'IN_PROGRESS', 'DELIVERED', 'ACCEPTED', 'ISSUE', 'CANCELLED']),
  Learning: Object.freeze(['DRAFT', 'REVIEWED', 'DISMISSED']),
  Connector: Object.freeze(['INACTIVE', 'ACTIVE', 'SUSPENDED']),
  ConnectorExecution: Object.freeze(['REQUESTED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'NEEDS_REVIEW']),
})

export const Lifecycle = Object.freeze({
  Source: Object.freeze({ ACTIVE: ['INACTIVE'], INACTIVE: ['ACTIVE'] }),
  DemandSignal: Object.freeze({ CAPTURED: ['QUALIFIED', 'REJECTED'], QUALIFIED: [], REJECTED: [] }),
  Opportunity: Object.freeze({ DRAFT: ['APPROVED', 'REJECTED'], APPROVED: ['CLOSED'], REJECTED: [], CLOSED: [] }),
  Offer: Object.freeze({ DRAFT: ['APPROVED', 'WITHDRAWN'], APPROVED: ['WITHDRAWN', 'EXPIRED'], WITHDRAWN: [], EXPIRED: [] }),
  Action: Object.freeze({ PROPOSED: ['APPROVED', 'DENIED', 'CANCELLED'], APPROVED: ['CANCELLED'], DENIED: [], CANCELLED: [] }),
  Conversation: Object.freeze({ OPEN: ['CLOSED'], CLOSED: [] }),
  Transaction: Object.freeze({ PENDING: ['PAID', 'FAILED', 'CANCELLED'], PAID: ['REFUNDED'], FAILED: [], REFUNDED: [], CANCELLED: [] }),
  Delivery: Object.freeze({ PENDING: ['IN_PROGRESS', 'CANCELLED'], IN_PROGRESS: ['DELIVERED', 'ISSUE', 'CANCELLED'], DELIVERED: ['ACCEPTED', 'ISSUE'], ACCEPTED: [], ISSUE: ['IN_PROGRESS', 'CANCELLED'], CANCELLED: [] }),
  Learning: Object.freeze({ DRAFT: ['REVIEWED', 'DISMISSED'], REVIEWED: [], DISMISSED: [] }),
  Connector: Object.freeze({ INACTIVE: ['ACTIVE'], ACTIVE: ['SUSPENDED', 'INACTIVE'], SUSPENDED: ['ACTIVE', 'INACTIVE'] }),
  ConnectorExecution: Object.freeze({ REQUESTED: ['RUNNING', 'FAILED'], RUNNING: ['SUCCEEDED', 'FAILED', 'NEEDS_REVIEW'], SUCCEEDED: [], FAILED: [], NEEDS_REVIEW: ['RUNNING', 'FAILED'] }),
})

const idPrefixes = Object.freeze({
  Source: 'src', DemandSignal: 'dmd', Opportunity: 'opp', Offer: 'off',
  Action: 'act', Conversation: 'con', Transaction: 'txn', Delivery: 'del',
  Learning: 'lrn', Connector: 'ctr', ConnectorExecution: 'cex', AuditEvent: 'aud',
})

const initialStates = Object.freeze({
  Source: 'ACTIVE', DemandSignal: 'CAPTURED', Opportunity: 'DRAFT', Offer: 'DRAFT',
  Action: 'PROPOSED', Conversation: 'OPEN', Transaction: 'PENDING', Delivery: 'PENDING',
  Learning: 'DRAFT', Connector: 'INACTIVE', ConnectorExecution: 'REQUESTED',
})

const secretKeyPattern = /(secret|password|token|credential|api[-_]?key|private[-_]?key|cookie)/i
const credentialPrefixes = ['cf' + 'ut_', 'cf' + 'at_', 'gh' + 'p_', 's' + 'k-']
const secretValuePattern = new RegExp(`\\b(?:${credentialPrefixes.join('|')})[A-Za-z0-9_-]+`, 'i')

export class DomainError extends Error {
  constructor(code, message, details = {}) {
    super(message)
    this.name = 'DomainError'
    this.code = code
    this.details = details
  }
}

const requireText = (value, name) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new DomainError('INVALID_INPUT', `${name} must be a non-empty string`)
  }
  return value.trim()
}

const requireTimestamp = (value, name) => {
  const text = requireText(value, name)
  if (Number.isNaN(Date.parse(text))) {
    throw new DomainError('INVALID_INPUT', `${name} must be an ISO-8601 timestamp`)
  }
  return text
}

const requireActor = (actor) => {
  if (!actor || typeof actor !== 'object') {
    throw new DomainError('ACTOR_REQUIRED', 'actor is required')
  }
  const type = requireText(actor.type, 'actor.type')
  const id = requireText(actor.id, 'actor.id')
  if (!['HUMAN_OPERATOR', 'SYSTEM', 'WORKER', 'CONNECTOR'].includes(type)) {
    throw new DomainError('INVALID_ACTOR', `unsupported actor type: ${type}`)
  }
  return Object.freeze({ type, id })
}

const assertPublicSafe = (value, path = 'value') => {
  if (typeof value === 'string' && secretValuePattern.test(value)) {
    throw new DomainError('SECRET_REJECTED', `${path} appears to contain a secret`)
  }
  if (!value || typeof value !== 'object') return
  for (const [key, child] of Object.entries(value)) {
    if (secretKeyPattern.test(key)) {
      throw new DomainError('SECRET_REJECTED', `${path}.${key} is not allowed in domain or audit data`)
    }
    assertPublicSafe(child, `${path}.${key}`)
  }
}

const makeId = (entityType, idFactory) => {
  if (typeof idFactory !== 'function') {
    throw new DomainError('ID_FACTORY_REQUIRED', 'idFactory must be supplied by the application boundary')
  }
  const value = requireText(idFactory(), 'generated id')
  const prefix = idPrefixes[entityType]
  if (!prefix || !value.startsWith(`kx_${prefix}_`)) {
    throw new DomainError('INVALID_ID', `${entityType} id must start with kx_${prefix}_`)
  }
  return value
}

const freezeRecord = (record) => Object.freeze({ ...record })

const baseRecord = ({ entityType, idFactory, now, provenance, evidenceRefs = [] }) => {
  if (!initialStates[entityType]) {
    throw new DomainError('UNSUPPORTED_ENTITY', `unsupported entity type: ${entityType}`)
  }
  const timestamp = requireTimestamp(now, 'now')
  const normalizedProvenance = Object.freeze({
    sourceType: requireText(provenance?.sourceType, 'provenance.sourceType'),
    sourceRef: requireText(provenance?.sourceRef, 'provenance.sourceRef'),
    evidenceClass: requireText(provenance?.evidenceClass, 'provenance.evidenceClass'),
  })
  if (!Object.values(EvidenceClass).includes(normalizedProvenance.evidenceClass)) {
    throw new DomainError('INVALID_EVIDENCE_CLASS', 'provenance.evidenceClass is unsupported')
  }
  const refs = evidenceRefs.map((ref, index) => requireText(ref, `evidenceRefs[${index}]`))
  assertPublicSafe({ provenance: normalizedProvenance, evidenceRefs: refs })
  return {
    id: makeId(entityType, idFactory),
    entityType,
    owner: DOMAIN_OWNER,
    state: initialStates[entityType],
    provenance: normalizedProvenance,
    evidenceRefs: Object.freeze(refs),
    createdAt: timestamp,
    updatedAt: timestamp,
    revision: 1,
  }
}

export function createDemandSignal(command, context) {
  const actor = requireActor(context?.actor)
  const problem = requireText(command?.problem, 'problem')
  const requestedOutcome = requireText(command?.requestedOutcome, 'requestedOutcome')
  const sourceId = requireText(command?.sourceId, 'sourceId')
  assertPublicSafe({ sourceId, problem, requestedOutcome })
  const base = baseRecord({
    entityType: EntityType.DEMAND_SIGNAL,
    idFactory: context.idFactory,
    now: context.now,
    provenance: command.provenance,
    evidenceRefs: command.evidenceRefs,
  })
  const entity = freezeRecord({ ...base, sourceId, problem, requestedOutcome })
  return Object.freeze({
    entity,
    auditEvent: createAuditEvent({
      eventType: 'DemandSignalCreated', command: 'CreateDemandSignal', actor,
      target: entity, previousState: null, resultingState: entity.state,
      reason: command.reason, correlationId: context.correlationId,
      evidenceRefs: entity.evidenceRefs, now: context.now, idFactory: context.auditIdFactory,
    }),
  })
}

export function createEntity(entityType, attributes, context) {
  const actor = requireActor(context?.actor)
  if (!attributes || typeof attributes !== 'object') {
    throw new DomainError('INVALID_INPUT', 'attributes are required')
  }
  const reservedFields = ['id', 'entityType', 'owner', 'state', 'createdAt', 'updatedAt', 'revision']
  for (const field of reservedFields) {
    if (Object.hasOwn(attributes, field)) {
      throw new DomainError('RESERVED_FIELD', `${field} is controlled by the domain boundary`)
    }
  }
  assertPublicSafe(attributes)
  const base = baseRecord({
    entityType,
    idFactory: context.idFactory,
    now: context.now,
    provenance: attributes.provenance,
    evidenceRefs: attributes.evidenceRefs,
  })
  const { provenance, evidenceRefs, ...businessAttributes } = attributes
  const entity = freezeRecord({ ...base, ...businessAttributes })
  validateEntityInvariants(entity)
  return Object.freeze({
    entity,
    auditEvent: createAuditEvent({
      eventType: `${entityType}Created`, command: `Create${entityType}`, actor,
      target: entity, previousState: null, resultingState: entity.state,
      reason: attributes.reason, correlationId: context.correlationId,
      evidenceRefs: entity.evidenceRefs, now: context.now, idFactory: context.auditIdFactory,
    }),
  })
}

const requireLink = (entity, field) => requireText(entity[field], `${entity.entityType}.${field}`)

export function validateEntityInvariants(entity) {
  if (!entity || entity.owner !== DOMAIN_OWNER || !Lifecycle[entity.entityType]) {
    throw new DomainError('INVALID_ENTITY', 'entity is not a KAERVAX canonical stateful record')
  }
  if (!States[entity.entityType].includes(entity.state)) {
    throw new DomainError('INVALID_STATE', `${entity.state} is not valid for ${entity.entityType}`)
  }
  if (entity.entityType === EntityType.SOURCE) {
    requireText(entity.sourceType, 'Source.sourceType')
    requireText(entity.name, 'Source.name')
  }
  if (entity.entityType === EntityType.DEMAND_SIGNAL) {
    requireLink(entity, 'sourceId')
    requireText(entity.problem, 'DemandSignal.problem')
    requireText(entity.requestedOutcome, 'DemandSignal.requestedOutcome')
  }
  if (entity.entityType === EntityType.OPPORTUNITY) {
    requireLink(entity, 'demandSignalId')
    requireText(entity.title, 'Opportunity.title')
  }
  if (entity.entityType === EntityType.OFFER) {
    requireLink(entity, 'opportunityId')
    requireText(entity.summary, 'Offer.summary')
    if (!Number.isInteger(entity.version) || entity.version < 1) {
      throw new DomainError('INVALID_INPUT', 'Offer.version must be a positive integer')
    }
  }
  if (entity.entityType === EntityType.ACTION) {
    requireLink(entity, 'originId')
    requireText(entity.actionType, 'Action.actionType')
  }
  if (entity.entityType === EntityType.CONVERSATION) {
    requireLink(entity, 'opportunityId')
    requireText(entity.channel, 'Conversation.channel')
  }
  if (entity.entityType === EntityType.TRANSACTION) {
    requireLink(entity, 'offerId')
    if (!Number.isSafeInteger(entity.amountMinor) || entity.amountMinor < 0) {
      throw new DomainError('INVALID_INPUT', 'Transaction.amountMinor must be a non-negative safe integer')
    }
    if (!/^[A-Z]{3}$/.test(entity.currency || '')) {
      throw new DomainError('INVALID_INPUT', 'Transaction.currency must be an ISO-style three-letter code')
    }
  }
  if (entity.entityType === EntityType.DELIVERY) {
    requireLink(entity, 'transactionId')
    requireText(entity.scopeRef, 'Delivery.scopeRef')
  }
  if (entity.entityType === EntityType.LEARNING) {
    requireLink(entity, 'originId')
    requireText(entity.observation, 'Learning.observation')
  }
  if (entity.entityType === EntityType.CONNECTOR) {
    requireText(entity.name, 'Connector.name')
    requireText(entity.capability, 'Connector.capability')
  }
  if (entity.entityType === EntityType.CONNECTOR_EXECUTION) {
    requireLink(entity, 'connectorId')
    requireText(entity.operation, 'ConnectorExecution.operation')
  }
  assertPublicSafe(entity)
  return true
}

const enforceTransitionPreconditions = (entity, toState, actor, command) => {
  if (entity.entityType === EntityType.DEMAND_SIGNAL && toState === 'QUALIFIED' && entity.evidenceRefs.length === 0) {
    throw new DomainError('EVIDENCE_REQUIRED', 'qualifying demand requires at least one evidence reference')
  }
  if (entity.entityType === EntityType.OPPORTUNITY && toState === 'APPROVED') {
    requireLink(entity, 'demandSignalId')
    requireText(command.reason, 'reason')
  }
  if (entity.entityType === EntityType.OFFER && toState === 'APPROVED') {
    requireLink(entity, 'opportunityId')
    requireText(command.reason, 'reason')
  }
  if (entity.entityType === EntityType.ACTION && toState === 'APPROVED') {
    if (actor.type !== 'HUMAN_OPERATOR') {
      throw new DomainError('APPROVAL_REQUIRED', 'only a human operator may approve a consequential action')
    }
    requireText(command.approvalRef, 'approvalRef')
  }
  if (entity.entityType === EntityType.TRANSACTION && ['PAID', 'REFUNDED'].includes(toState)) {
    throw new DomainError('FUTURE_PHASE_BOUNDARY', 'authoritative payment transitions are not executable in Phase 2')
  }
  if (entity.entityType === EntityType.CONNECTOR_EXECUTION && toState !== 'REQUESTED') {
    throw new DomainError('FUTURE_PHASE_BOUNDARY', 'connector execution transitions are not executable in Phase 2')
  }
}

export function transitionEntity(entity, command, context) {
  validateEntityInvariants(entity)
  const actor = requireActor(context?.actor)
  const toState = requireText(command?.toState, 'toState')
  const allowed = Lifecycle[entity.entityType][entity.state] || []
  if (!allowed.includes(toState)) {
    throw new DomainError('INVALID_TRANSITION', `${entity.entityType} cannot transition from ${entity.state} to ${toState}`)
  }
  enforceTransitionPreconditions(entity, toState, actor, command)
  const timestamp = requireTimestamp(context.now, 'now')
  const next = freezeRecord({ ...entity, state: toState, updatedAt: timestamp, revision: entity.revision + 1 })
  return Object.freeze({
    entity: next,
    auditEvent: createAuditEvent({
      eventType: `${entity.entityType}StateChanged`, command: 'TransitionEntity', actor,
      target: next, previousState: entity.state, resultingState: toState,
      reason: command.reason, correlationId: context.correlationId,
      evidenceRefs: next.evidenceRefs, approvalRef: command.approvalRef,
      now: context.now, idFactory: context.auditIdFactory,
    }),
  })
}

export function createAuditEvent(input) {
  const actor = requireActor(input.actor)
  const timestamp = requireTimestamp(input.now, 'now')
  const targetId = requireText(input.target?.id, 'target.id')
  const targetType = requireText(input.target?.entityType, 'target.entityType')
  const event = {
    id: makeId('AuditEvent', input.idFactory),
    entityType: 'AuditEvent',
    owner: DOMAIN_OWNER,
    eventType: requireText(input.eventType, 'eventType'),
    actor,
    source: actor.type,
    command: requireText(input.command, 'command'),
    target: Object.freeze({ entityType: targetType, id: targetId }),
    previousState: input.previousState ?? null,
    resultingState: input.resultingState ?? null,
    reason: input.reason ? requireText(input.reason, 'reason') : null,
    correlationId: input.correlationId ? requireText(input.correlationId, 'correlationId') : null,
    approvalRef: input.approvalRef ? requireText(input.approvalRef, 'approvalRef') : null,
    evidenceRefs: Object.freeze((input.evidenceRefs || []).map((ref, index) => requireText(ref, `evidenceRefs[${index}]`))),
    occurredAt: timestamp,
  }
  assertPublicSafe(event)
  return freezeRecord(event)
}

export const DomainPolicy = Object.freeze({
  owner: DOMAIN_OWNER,
  persistence: 'DEFERRED',
  mutationBoundary: 'PURE_DOMAIN_COMMANDS',
  externalExecution: 'NOT_IMPLEMENTED',
  paymentAuthority: 'NOT_IMPLEMENTED',
  auditStorage: 'CALLER_OWNED_AND_DEFERRED',
})
