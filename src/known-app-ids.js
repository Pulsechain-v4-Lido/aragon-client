import { hash as namehash } from 'eth-ens-namehash'

// These app IDs are generated from <name>.lidopm.eth
export default {
  Agent: namehash('agent.lidopm.eth'),
  Finance: namehash('finance.lidopm.eth'),
  Fundraising: namehash('aragon-fundraising.lidopm.eth'),
  Survey: namehash('survey.lidopm.eth'),
  TokenManager: namehash('token-manager.lidopm.eth'),
  Vault: namehash('vault.lidopm.eth'),
  Voting: namehash('voting.lidopm.eth'),
}
