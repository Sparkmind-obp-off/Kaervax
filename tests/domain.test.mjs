import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DomainError,
  DomainPolicy,
  EntityType,
  EvidenceClass,
  Lifecycle,
  StatefulEntityTypes,
  States,
  createDemandSignal,
  createEntity,
  transitionEntity,
} from '../src/domain/index.js'

const at = (second = 0) => `2026-09-18T12:00:${String(second).padStart(2, '0')}.000Z`
const ids = (prefix) => {
  let sequence = 0
  return () => `kx_${prefix}_${++sequence}`
}
const actor = Object.freeze({ type: 'HUMAN_OPERATOR', id: 'operator-primary' })
const provenance = Object.freeze({
  sourceType: 'MANUAL_REVIEW',
  sourceRef: 'evidence://phase-2/test-fixture',
  evidenceClass: EvidenceClass.SYNTHETIC,
})

const context = (prefix, second = 0, acting = actor) => ({
  actor: acting,
  now: at(second),
  correlationId: `test-${prefix}-${second}`,
  idFactory: ids(prefix),
  auditIdFactory: ids('aud'),
})

const create = (entityType, attributes, prefix) => createEntity(
  entityType,
  { provenance, evidenceRefs: ['evidence://synthetic/domain-test'], ...attributes },
  context(prefix),
)

const expectCode = (code, operation) => assert.throws(operation, (error) => {
  assert.ok(error instanceof DomainError)
  assert.equal(error.code, code)
  return true
})

test('all stateful Phase 2 concepts have explicit states and lifecycle rules', () => {
  assert.deepEqual(Object.keys(States).sort(), [...StatefulEntityTypes].sort())
  assert.deepEqual(Object.keys(Lifecycle).sort(), [...StatefulEntityTypes].sort())
  assert.equal(EntityType.AUDIT_EVENT, 'AuditEvent')
})

test('domain policy keeps ownership canonical and persistence/execution deferred', () => {
  assert.deepEqual(DomainPolicy, {
    owner: 'KAERVAX',
    persistence: 'DEFERRED',
    mutationBoundary: 'PURE_DOMAIN_COMMANDS',
    externalExecution: 'NOT_IMPLEMENTED',
    paymentAuthority: 'NOT_IMPLEMENTED',
    auditStorage: 'CALLER_OWNED_AND_DEFERRED',
  })
})

test('CreateDemandSignal produces a KAERVAX-owned immutable record and audit event', () => {
  const result = createDemandSignal({
    sourceId: 'kx_src_1',
    problem: 'Synthetic buyer needs a conversion page',
    requestedOutcome: 'A clear action path',
    provenance,
    evidenceRefs: ['evidence://synthetic/demand-1'],
    reason: 'Domain contract test',
  }, context('dmd'))

  assert.equal(result.entity.id, 'kx_dmd_1')
  assert.equal(result.entity.owner, 'KAERVAX')
  assert.equal(result.entity.state, 'CAPTURED')
  assert.ok(Object.isFrozen(result.entity))
  assert.equal(result.auditEvent.eventType, 'DemandSignalCreated')
  assert.equal(result.auditEvent.target.id, result.entity.id)
  assert.equal(result.auditEvent.actor.type, 'HUMAN_OPERATOR')
})

test('external references remain provenance and never replace canonical identity', () => {
  const result = createDemandSignal({
    sourceId: 'kx_src_1',
    problem: 'Synthetic need',
    requestedOutcome: 'Synthetic outcome',
    provenance: { ...provenance, sourceRef: 'provider://external-123' },
    evidenceRefs: ['provider://evidence-123'],
  }, context('dmd'))

  assert.equal(result.entity.id, 'kx_dmd_1')
  assert.notEqual(result.entity.id, result.entity.provenance.sourceRef)
  assert.equal(result.entity.provenance.sourceRef, 'provider://external-123')
})

test('qualifying demand requires evidence and follows an allowed transition', () => {
  const captured = createDemandSignal({
    sourceId: 'kx_src_1', problem: 'Synthetic need', requestedOutcome: 'Synthetic outcome',
    provenance, evidenceRefs: ['evidence://synthetic/demand-2'],
  }, context('dmd')).entity
  const qualified = transitionEntity(captured, { toState: 'QUALIFIED', reason: 'Evidence reviewed' }, context('dmd', 1))

  assert.equal(qualified.entity.state, 'QUALIFIED')
  assert.equal(qualified.entity.revision, 2)
  assert.equal(qualified.auditEvent.previousState, 'CAPTURED')
  assert.equal(qualified.auditEvent.resultingState, 'QUALIFIED')
})

test('invalid and terminal-state transitions are rejected deterministically', () => {
  const captured = createDemandSignal({
    sourceId: 'kx_src_1', problem: 'Synthetic need', requestedOutcome: 'Synthetic outcome',
    provenance, evidenceRefs: ['evidence://synthetic/demand-3'],
  }, context('dmd')).entity

  expectCode('INVALID_TRANSITION', () => transitionEntity(captured, { toState: 'PAID' }, context('dmd', 1)))
  const rejected = transitionEntity(captured, { toState: 'REJECTED', reason: 'Not a fit' }, context('dmd', 1)).entity
  expectCode('INVALID_TRANSITION', () => transitionEntity(rejected, { toState: 'QUALIFIED' }, context('dmd', 2)))
})

test('opportunity and offer creation enforce canonical relationship references', () => {
  expectCode('INVALID_INPUT', () => create(EntityType.OPPORTUNITY, { title: 'Missing demand link' }, 'opp'))
  const opportunity = create(EntityType.OPPORTUNITY, { demandSignalId: 'kx_dmd_1', title: 'Synthetic opportunity' }, 'opp').entity
  expectCode('INVALID_INPUT', () => create(EntityType.OFFER, { summary: 'Missing opportunity link' }, 'off'))
  const offer = create(EntityType.OFFER, { opportunityId: opportunity.id, summary: 'Synthetic offer', version: 1 }, 'off').entity
  assert.equal(offer.opportunityId, opportunity.id)
})

test('opportunity and offer approvals require an explicit reason', () => {
  const opportunity = create(EntityType.OPPORTUNITY, { demandSignalId: 'kx_dmd_1', title: 'Synthetic opportunity' }, 'opp').entity
  expectCode('INVALID_INPUT', () => transitionEntity(opportunity, { toState: 'APPROVED' }, context('opp', 1)))
  const approvedOpportunity = transitionEntity(opportunity, { toState: 'APPROVED', reason: 'Human review' }, context('opp', 1)).entity
  const offer = create(EntityType.OFFER, { opportunityId: approvedOpportunity.id, summary: 'Synthetic offer', version: 1 }, 'off').entity
  expectCode('INVALID_INPUT', () => transitionEntity(offer, { toState: 'APPROVED' }, context('off', 1)))
  assert.equal(transitionEntity(offer, { toState: 'APPROVED', reason: 'Terms reviewed' }, context('off', 1)).entity.state, 'APPROVED')
})

test('consequential action approval cannot be performed by a worker or without approval evidence', () => {
  const action = create(EntityType.ACTION, { originId: 'kx_off_1', actionType: 'OUTBOUND_MESSAGE' }, 'act').entity
  const worker = { type: 'WORKER', id: 'worker-draft-only' }
  expectCode('APPROVAL_REQUIRED', () => transitionEntity(action, { toState: 'APPROVED', approvalRef: 'approval://1' }, context('act', 1, worker)))
  expectCode('INVALID_INPUT', () => transitionEntity(action, { toState: 'APPROVED' }, context('act', 1)))
  const approved = transitionEntity(action, { toState: 'APPROVED', approvalRef: 'approval://human/1', reason: 'Reviewed' }, context('act', 1))
  assert.equal(approved.entity.state, 'APPROVED')
  assert.equal(approved.auditEvent.approvalRef, 'approval://human/1')
})

test('Phase 2 refuses authoritative payment and connector execution transitions', () => {
  const transaction = create(EntityType.TRANSACTION, { offerId: 'kx_off_1', amountMinor: 150000000, currency: 'IDR' }, 'txn').entity
  expectCode('FUTURE_PHASE_BOUNDARY', () => transitionEntity(transaction, { toState: 'PAID', reason: 'Unverified claim' }, context('txn', 1)))
  const execution = create(EntityType.CONNECTOR_EXECUTION, { connectorId: 'kx_ctr_1', operation: 'send' }, 'cex').entity
  expectCode('FUTURE_PHASE_BOUNDARY', () => transitionEntity(execution, { toState: 'RUNNING' }, context('cex', 1)))
})

test('every stateful target concept can create a minimal canonical record with enforced relationships', () => {
  const fixtures = [
    [EntityType.SOURCE, 'src', { sourceType: 'MANUAL', name: 'Synthetic source' }],
    [EntityType.DEMAND_SIGNAL, 'dmd', { sourceId: 'kx_src_1', problem: 'Synthetic need', requestedOutcome: 'Synthetic outcome' }],
    [EntityType.OPPORTUNITY, 'opp', { demandSignalId: 'kx_dmd_1', title: 'Synthetic opportunity' }],
    [EntityType.OFFER, 'off', { opportunityId: 'kx_opp_1', summary: 'Synthetic offer', version: 1 }],
    [EntityType.ACTION, 'act', { originId: 'kx_off_1', actionType: 'OUTBOUND_MESSAGE' }],
    [EntityType.CONVERSATION, 'con', { opportunityId: 'kx_opp_1', channel: 'MANUAL' }],
    [EntityType.TRANSACTION, 'txn', { offerId: 'kx_off_1', amountMinor: 150000000, currency: 'IDR' }],
    [EntityType.DELIVERY, 'del', { transactionId: 'kx_txn_1', scopeRef: 'scope://synthetic/1' }],
    [EntityType.LEARNING, 'lrn', { originId: 'kx_del_1', observation: 'Synthetic observation' }],
    [EntityType.CONNECTOR, 'ctr', { name: 'Synthetic adapter', capability: 'DISCOVERY' }],
    [EntityType.CONNECTOR_EXECUTION, 'cex', { connectorId: 'kx_ctr_1', operation: 'DISCOVER' }],
  ]

  for (const [entityType, prefix, attributes] of fixtures) {
    const result = create(entityType, attributes, prefix)
    assert.equal(result.entity.owner, 'KAERVAX')
    assert.equal(result.entity.entityType, entityType)
    assert.equal(result.entity.state, States[entityType][0])
    assert.equal(result.auditEvent.target.id, result.entity.id)
  }
})

test('generic creation rejects caller-controlled canonical core fields', () => {
  expectCode('RESERVED_FIELD', () => create(EntityType.OPPORTUNITY, {
    id: 'provider-owned-id', demandSignalId: 'kx_dmd_1', title: 'Synthetic opportunity',
  }, 'opp'))
  expectCode('RESERVED_FIELD', () => create(EntityType.ACTION, {
    state: 'APPROVED', originId: 'kx_off_1', actionType: 'OUTBOUND_MESSAGE',
  }, 'act'))
})

test('secret-shaped fields and credential values are rejected from records and audit context', () => {
  expectCode('SECRET_REJECTED', () => create(EntityType.ACTION, {
    originId: 'kx_off_1', actionType: 'OUTBOUND_MESSAGE', apiKey: 'not-allowed',
  }, 'act'))
  expectCode('SECRET_REJECTED', () => createDemandSignal({
    sourceId: 'kx_src_1', problem: 'Contains ' + 'cf' + 'ut_exampleCredential', requestedOutcome: 'Rejected',
    provenance, evidenceRefs: ['evidence://synthetic/rejected'],
  }, context('dmd')))
})

test('audit events contain references and state deltas, not entity snapshots', () => {
  const opportunity = create(EntityType.OPPORTUNITY, { demandSignalId: 'kx_dmd_1', title: 'Synthetic opportunity' }, 'opp').entity
  const result = transitionEntity(opportunity, { toState: 'REJECTED', reason: 'Outside fixed scope' }, context('opp', 1))
  assert.deepEqual(result.auditEvent.target, { entityType: 'Opportunity', id: opportunity.id })
  assert.equal(result.auditEvent.previousState, 'DRAFT')
  assert.equal(result.auditEvent.resultingState, 'REJECTED')
  assert.equal('before' in result.auditEvent, false)
  assert.equal('after' in result.auditEvent, false)
})
