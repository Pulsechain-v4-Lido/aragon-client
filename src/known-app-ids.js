import { hash as namehash } from 'eth-ens-namehash'

// These app IDs are generated from <name>.lidopm.eth
export default {
  Agent: namehash('aragon-agent.lidopm.eth'),
  Finance: namehash('aragon-finance.lidopm.eth'),
  Fundraising: namehash('aragon-fundraising.lidopm.eth'),
  Survey: namehash('aragon-survey.lidopm.eth'),
  TokenManager: namehash('aragon-token-manager.lidopm.eth'),
  Vault: namehash('aragon-vault.lidopm.eth'),
  Voting: namehash('aragon-voting.lidopm.eth'),
  Oracle: namehash('oracle.lidopm.eth'),
  Lido: namehash('lido.lidopm.eth'),
  NodeOperator: namehash('node-operators-registry.lidopm.eth'),
}
