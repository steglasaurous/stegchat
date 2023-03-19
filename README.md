# StegChat: A Twitch chat overlay

Other overlays didn't _quite_ do what I wanted, so I made one. :)  This chat overlay shows messages horizontally on the screen.  Supports the usual twitch emotes.

![image](docs/images/example.png)

If others find this useful, I may extend its abilities, customization, etc., but also welcome contributors!

**NOTE: This is super-duper alpha. I will be cleaning up the code over the coming weeks for more general consumption.**

## Requirements

- Streamer.bot with websocket server started - Used as the connecting mechanism to read chat messages from.  Tested with v0.1.19.
- If building the app yourself, you'll need node.js v16.x or better.  

## Usage

### Quickstart
TBD: Using a hosted URL - not yet provisioned.

### Advanced (or building it yourself)

Start with installing dependencies:
```
npm install
```

To serve the app from the default http://localhost:4200 :

```
npx ng serve
```

