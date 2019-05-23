# pg-extras

A heroku plugin to open ssh tunnel for psql connection to private space

### Installation

```bash
$ heroku plugins:install heroku-psql-tunnel
```

### Usage
```
$ heroku psqlssh -a appName [DATABASE]

OPTIONS
  -a, --app=app              (required) app to run command against
  -k, --keepAlive            don't close the tunnel after a client disconnects
  -p, --localPort=localPort  [default: 50000] local port on which ssh tunnel will be listning
```

## THIS IS BETA SOFTWARE

Thanks for trying it out. If you find any issues, please notify us at
w.migas+psqlssh@polsource.com

