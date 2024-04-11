import React from 'react'
import PropTypes from 'prop-types'
import { AppBadge } from '@aragon/ui'
import iconSvgAddressBook from './icons/address-book.svg'
import iconSvgAgent from './icons/agent.svg'
import iconSvgAllocations from './icons/allocations.svg'
import iconSvgDandelionVoting from './icons/dandelion-voting.svg'
import iconSvgDotVoting from './icons/dot-voting.svg'
import iconSvgFinance from './icons/finance.svg'
import iconSvgFundraising from './icons/fundraising.svg'
import iconSvgPayroll from './icons/payroll.svg'
import iconSvgProjects from './icons/projects.svg'
import iconSvgRedemptions from './icons/redemptions.svg'
import iconSvgRewards from './icons/rewards.svg'
import iconSvgTimeLock from './icons/time-lock.svg'
import iconSvgTokens from './icons/token-manager.svg'
import iconSvgTokenRequest from './icons/token-request.svg'
import iconSvgVault from './icons/vault.svg'
import iconSvgVoting from './icons/voting.svg'

const KNOWN_ICONS = new Map([
  ['address-book.lidopm.eth', iconSvgAddressBook],
  ['agent.lidopm.eth', iconSvgAgent],
  ['allocations.lidopm.eth', iconSvgAllocations],
  ['aragon-fundraising.lidopm.eth', iconSvgFundraising],
  ['dandelion-voting.lidopm.eth', iconSvgDandelionVoting],
  ['dot-voting.lidopm.eth', iconSvgDotVoting],
  ['finance.lidopm.eth', iconSvgFinance],
  ['payroll.lidopm.eth', iconSvgPayroll],
  ['projects.lidopm.eth', iconSvgProjects],
  ['redemptions.lidopm.eth', iconSvgRedemptions],
  ['rewards.lidopm.eth', iconSvgRewards],
  ['time-lock.lidopm.eth', iconSvgTimeLock],
  ['token-manager.lidopm.eth', iconSvgTokens],
  ['token-request.lidopm.eth', iconSvgTokenRequest],
  ['vault.lidopm.eth', iconSvgVault],
  ['voting.lidopm.eth', iconSvgVoting],
])

function KnownAppBadge({ appName, compact, label }) {
  return <AppBadge badgeOnly iconSrc={KNOWN_ICONS.get(appName)} label={label} />
}
KnownAppBadge.propTypes = {
  appName: PropTypes.string.isRequired,
  compact: PropTypes.bool,
  label: PropTypes.string.isRequired,
}

export default KnownAppBadge
