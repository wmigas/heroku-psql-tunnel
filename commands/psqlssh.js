'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const pg = require('@heroku-cli/plugin-pg-v5')
const bastion = require('@heroku-cli/plugin-pg-v5/lib/bastion')

function * run (context, heroku) {
  let db = yield pg.fetcher(heroku).database(context.app, context.args.database)
  let dbTunnelConfig = bastion.tunnelConfig(db)
  dbTunnelConfig.localPort = context.flags.localPort;
  dbTunnelConfig.keepAlive = context.flags.keepAlive;//do not close tunnel after client is diconnected
  console.log(`postgres://${db.user}:${db.password}@localhost:${dbTunnelConfig.localPort}/${db.database}`)
  yield bastion.sshTunnel(db, dbTunnelConfig)
}

const cmd = {
  description: 'provides ssh tunnel settings for psql connection to private space',
  needsApp: true,
  needsAuth: true,
  args: [{name: 'database', optional: true}],
  flags: [
    {name: 'localPort', char: 'p', description: 'local port on which ssh tunnel will be listning', hasValue: true, default: 50000},
	{name: 'keepAlive', char: 'k', description: 'don\'t close the tunnel after a client disconnects', hasValue: false}
  ],
  run: cli.command({preauth: true}, co.wrap(run))
}

module.exports = [
  Object.assign({command: 'psqlssh'}, cmd),
]
