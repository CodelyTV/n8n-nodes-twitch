<p align="center">
  <a href="https://codely.com">
    <img src="https://user-images.githubusercontent.com/10558907/170513882-a09eee57-7765-4ca4-b2dd-3c2e061fdad0.png" width="300px" height="92px"/>
  </a>
</p>

<h1 align="center">
  🛠 Twitch node for <code>n8n</code>
</h1>

<p align="center">
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/Codely-OS-green.svg?style=flat-square" alt="Codely Open Source"/></a>
    <a href="https://pro.codely.com"><img src="https://img.shields.io/badge/Codely-Pro-black.svg?style=flat-square" alt="Codely Courses"/></a>
</p>

<p align="center">
  Receive notifications when something happens in your Twitch Stream (or other's). Installing this node, you'll be able to trigger workflows based on "Stream goes online/offline", "new follow" and some other events.
  <br />
  <br />
  Take a look, play and have fun with this.
  <a href="https://github.com/CodelyTV/n8n-nodes-twitch/stargazers">Stars are welcome 😊</a>
</p>

# 👀 n8n Twitch node features

Once installed, you will be able to add Twitch triggers to your n8n workflows.

1. Search for Twitch node:
	 ![Twitch node in the n8n nodes panel](/docs/node.png)
2. Select the desired trigger:
	 ![Twitch node triggers](/docs/triggers.png)

# 🚀 Installation instructions

This node is in the process to be officially verified by n8n.
The installation process will be much simpler once we get that verification, but in the meantime, you have several
options:

## a) Self-hosted n8n instance: npm package

Go to the folder where n8n is installed (if you are using the standard Docker installation, it will probably be:
`/usr/local/lib/node_modules/n8n`) and install the package as any other npm package:

```bash
npm i @codelytv/n8n-nodes-twitch
```

## b) Self-hosted n8n instance: Custom Docker image

Add the following statement in your `Dockerfile`:

```dockerfile
RUN mkdir -p ~/.n8n/nodes && \
    cd ~/.n8n/nodes && \
    npm install --production --force @codelytv/n8n-nodes-twitch
```

## c) Self-hosted n8n instance: Docker Compose / Docker Swarm with mapped volume

Take into account that this option has a considerable downside:
The workflows you create will contain `CUSTOM.twitchTrigger` as the node type reference instead of `@codelytv/n8n-nodes-twitch.twitchTrigger`. However, it could be the best approach if you want a faster feedback loop while developing.
Take into account that localhost will not be reachable from Twitch, so you `probably are interested into exposing it with a tunnel using something like `cloudflared`, or just expose a remote host to Twitch.

Docker Compose / Docker Swarm definition snippet:

```yaml
volumes:
  n8n_data:
    name: '{{.Service.Name}}_{{.Task.Slot}}'

services:
  n8n-main:
    volumes:
      - n8n_data:/home/node/.n8n
      - /home/codely/n8n-custom-nodes:/home/node/.n8n/custom
```

Deploy process:

```bash
CUSTOM_NODES_DIR="$HOME/n8n-custom-nodes"

mkdir -p "$CUSTOM_NODES_DIR"

docker run --rm \
  --user "$(id -u):$(id -g)" \
  -v "$CUSTOM_NODES_DIR":/data \
  -w /data \
  node:22-alpine \
  sh -c "npm install @codelytv/n8n-nodes-twitch --production --silent"

docker stack deploy -c n8n-swarm.yml n8n
```

# 🔑 How to get Twitch credentials

You will need to create a new Twitch application to get Client ID and Client Secret following these steps:

1. Go to the [Twitch Developer Console](https://dev.twitch.tv/console/apps).
2. Log in using your Twitch account credentials.
3. Click on the "+ Register Your Application" button.
4. Fill out the form as follows and click "Create":
   - Name: Name your app (e.g., “n8nTwitchBot”).
   - OAuth Redirect URLs: Use a valid redirect URL.
     Something like http://localhost:5678/rest/oauth2-credential/callback works.
     We do not plan to display Twitch authentication to end users with Oauth.
     We're only interested in getting the Client ID and Client Secret, so it's fine to specify a local URL.
   - Category: Application Integration
   - Client Type: Confidential
5. Get your credentials:
   - Click on "Manage"
   - Client ID: Visible right away.
   - Client Secret: Click "New Secret" to generate one. Be sure to store this securely (it won’t be shown again).

# 💻 Documentation for node contributors

How to locally test this node (based on [the official n8n guide](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/)):

1. Clone and move to the node development folder
   ```bash
   cd ~/Code/work/codely/public/
   git clone git@github.com:CodelyTV/n8n-nodes-twitch.git
   cd n8n-nodes-twitch
   ```
2. Build the node
   ```bash
   npm run build
   ```
3. Create a npm global symlink to the locally installed package 
   ```bash
   npm link
   ```
4. Install n8n locally:
   ```bash
   npm install n8n -g
   ```
5. Move to your n8n local installation
   ```bash
   cd ~/.n8n/
   ```
6. Create a custom nodes folder
    ```bash
    mkdir custom
    cd custom
7. Link the node package to the symlink previously created
    ```bash
    npm link @codelytv/n8n-nodes-twitch
    ```
8. Validate that the local n8n instance has the Twitch node pointing to the local folder
   ```bash
   tree -L 3 -d
   ```
   Expected output:
   ```bash
   .
   └── node_modules
       └── @codelytv
           └── n8n-nodes-twitch -> ../../../../Code/work/codely/public/n8n-nodes-twitch
   ```
9. Run n8n
    ```bash
    n8n start
    ```
10. Enjoy!

# 👌 Codely Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

- 🤝 Respect **Semantic Versioning**: No breaking changes in patch or minor versions
- 🤏 No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
- 🎯 **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
- ✅ **Tests** as documentation and usage examples
- 📖 **Well documented ReadMe** showing how to install and use
- ⚖️ **License favoring Open Source** and collaboration
