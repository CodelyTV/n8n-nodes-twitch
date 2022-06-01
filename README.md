<p align="center">
  <a href="https://codely.com">
    <img src="https://user-images.githubusercontent.com/10558907/170513882-a09eee57-7765-4ca4-b2dd-3c2e061fdad0.png" width="300px" height="92px"/>
  </a>
</p>

<h1 align="center">
  🛠 Twitch Trigger node for <code>n8n</code>
</h1>

<p align="center">
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/CodelyTV-OS-green.svg?style=flat-square" alt="Codely Open Source"/></a>
    <a href="https://pro.codely.tv"><img src="https://img.shields.io/badge/CodelyTV-PRO-black.svg?style=flat-square" alt="CodelyTV Courses"/></a>
</p>

<p align="center">
  Receive notifications when something happens in your Twitch Stream (or other's). Installing this node you'll be able to trigger automations based on "Stream goes online/offline", "new follow" and some other events.
  <br />
  <br />
  Take a look, play and have fun with this.
  <a href="https://github.com/CodelyTV/n8n-nodes-twitch/stargazers">Stars are welcome 😊</a>
</p>

# 👀 Usage example

Usually all the nodes you need for a certain task are already included with n8n.
They take care of the new additions via PR and, at some point, they get added to the core packages.

There is an alternative way that is creating an npm package with just the component you want to add and install it in the n8n instance you have, which is the recommended way for custom packages that are going to be used only in your context/company/environment.

So, if you already have a n8n instance running, you could jump to the installation part and follow the instructions.

Once it's installed, it will appear in the components palette, as any other component:

![Component palette with Twitch Trigger Node](/docs/components.png)

![Trigger node options in workflow](/docs/trigger_options.png)

# 👍 How to install

Just go to your n8n instance, find the folder where n8n is installed (if you are using the standard Docker installation, it will probably be: /usr/local/lib/node_modules/n8n) and install the package as any other npm package:

- Npm: `npm i @codelytv/n8n-nodes-twitch`
- Yarn: `yarn add @codelytv/n8n-nodes-twitch`

If you want to create a custom Docker image to have it installed by default (that's what we do), you could use our Dockerfile as a base. Take a look at our custom docker image repo:

 <a href="https://github.com/CodelyTV/n8n-codely-custom-image">Simple Dockerfile for custom n8n image</a>

# 👌 Codely Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

- 🤝 Respect **Semantic Versioning**: No breaking changes in patch or minor versions
- 🤏 No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to met the purpose
- 🎯 **One specific purpose** to met without having to carry a bunch of unnecessary other utilities
- ✅ **Tests** as documentation and usage examples
- 📖 **Well documented ReadMe** showing how to install and use
- ⚖️ **License favoring Open Source** and collaboration

