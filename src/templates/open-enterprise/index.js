import React from 'react'
import BN from 'bn.js'
import {
  ClaimDomainScreen,
  DotVotingScreen,
  KnownAppBadge,
  ReviewScreen,
  TokensScreen,
  VotingScreen,
} from '../kit'

import header from './header.svg'
import icon from './icon.svg'

const ONE_PERCENT = new BN(10).pow(new BN(16))

function completeDomain(domain) {
  return domain ? `${domain}.aragonid.eth` : ''
}

function adjustVotingSettings(support, quorum) {
  // The max value for both support and quorum is 100% - 1
  const hundredPercent = ONE_PERCENT.mul(new BN(100))

  let adjustedSupport = ONE_PERCENT.mul(new BN(support))
  if (adjustedSupport.eq(hundredPercent)) {
    adjustedSupport = adjustedSupport.sub(new BN(1))
  }

  let adjustedQuorum = ONE_PERCENT.mul(new BN(quorum))
  if (adjustedQuorum.eq(hundredPercent)) {
    adjustedQuorum = adjustedQuorum.sub(new BN(1))
  }

  return [adjustedSupport.toString(), adjustedQuorum.toString()]
}

function adjustDotVotingSettings(dvSupport, dvQuorum) {
  const adjustedDvSupport = ONE_PERCENT.mul(new BN(dvSupport))

  // The min value for quorum must be 1 or greater
  const adjustedDvQuorum = new BN(dvQuorum).isZero()
    ? new BN(1)
    : ONE_PERCENT.mul(new BN(dvQuorum))

  return [adjustedDvSupport.toString(), adjustedDvQuorum.toString()]
}

export default {
  id: 'open-enterprise-template.lidopm.eth',
  name: 'Open Enterprise',
  header,
  icon,
  description: `
    A suite of apps for organizations, including project management,
    bounties, budget planning and rewards.
  `,
  userGuideUrl: 'https://autark.gitbook.io/open-enterprise/',
  sourceCodeUrl: 'https://github.com/AutarkLabs/open-enterprise',
  registry: 'lidopm.eth',
  apps: [
    { appName: 'voting.lidopm.eth', label: 'Voting' },
    { appName: 'token-manager.lidopm.eth', label: 'Tokens' },
    { appName: 'finance.lidopm.eth', label: 'Finance' },
    { appName: 'address-book.lidopm.eth', label: 'Address Book' },
    { appName: 'allocations.lidopm.eth', label: 'Allocations' },
    { appName: 'dot-voting.lidopm.eth', label: 'Dot Voting' },
    { appName: 'projects.lidopm.eth', label: 'Projects' },
    { appName: 'rewards.lidopm.eth', label: 'Rewards' },
  ],
  screens: [
    [
      data => completeDomain(data.domain) || 'Claim domain',
      props => <ClaimDomainScreen screenProps={props} />,
    ],
    ['Configure template', props => <VotingScreen screenProps={props} />],
    ['Configure template', props => <DotVotingScreen screenProps={props} />],
    ['Configure template', props => <TokensScreen screenProps={props} />],
    [
      'Review information',
      props => {
        const { domain, dotVoting, tokens, voting } = props.data
        return (
          <ReviewScreen
            screenProps={props}
            items={[
              {
                label: 'General info',
                fields: [
                  ['Organization template', 'Open Enterprise'],
                  ['Name', completeDomain(domain)],
                ],
              },
              {
                label: (
                  <KnownAppBadge appName="voting.lidopm.eth" label="Voting" />
                ),
                fields: VotingScreen.formatReviewFields(voting),
              },
              {
                label: (
                  <KnownAppBadge
                    appName="dot-voting.lidopm.eth"
                    label="Dot Voting"
                  />
                ),
                fields: DotVotingScreen.formatReviewFields(dotVoting),
              },
              {
                label: (
                  <KnownAppBadge
                    appName="token-manager.lidopm.eth"
                    label="Tokens"
                  />
                ),
                fields: TokensScreen.formatReviewFields(tokens),
              },
            ]}
          />
        )
      },
    ],
  ],
  prepareTransactions(createTx, data) {
    const allocationsPeriod = 0 // default
    const financePeriod = 0 // default

    const { domain, dotVoting, tokens, voting } = data
    const { tokenName, tokenSymbol, members } = tokens

    const baseStake = new BN(10).pow(new BN(18))
    const stakes = members.map(([_, stake]) =>
      baseStake.mul(new BN(stake.toString())).toString()
    )
    const accounts = members.map(([account]) => account)

    const { support, quorum, duration } = voting
    const [adjustedSupport, adjustedQuorum] = adjustVotingSettings(
      support,
      quorum
    )
    const adjustedDuration = new BN(duration).toString()
    const votingSettings = [adjustedSupport, adjustedQuorum, adjustedDuration]

    const {
      support: dvSupport,
      quorum: dvQuorum,
      duration: dvDuration,
    } = dotVoting
    const [adjustedDvSupport, adjustedDvQuorum] = adjustDotVotingSettings(
      dvSupport,
      dvQuorum
    )
    const adjustedDvDuration = new BN(dvDuration).toString()
    const dotVotingSettings = [
      adjustedDvQuorum,
      adjustedDvSupport,
      adjustedDvDuration,
    ]

    /* For Open Enterprise, is currently not possible to use a single tx, the creation process cost is ~10M gas */
    return [
      {
        name: 'Create organization',
        transaction: createTx('newTokenAndInstance', [
          tokenName,
          tokenSymbol,
          domain,
          accounts,
          stakes,
          votingSettings,
          financePeriod,
        ]),
      },
      {
        name: 'Install Open Enterprise',
        transaction: createTx('newOpenEnterprise', [
          dotVotingSettings,
          allocationsPeriod,
          false, // useDiscussions option, will revisit when forwarding API gets ready
        ]),
      },
    ]
  },
}
