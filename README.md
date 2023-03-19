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

# TODO

- [ ] Add parameter `websocket_host` to configure where to connect to streamer.bot's websocket server, remove hard-coded value. 
- [ ] BUG: Message boxes change shape to fit in their container - should maintain their original shape and push other messages off-screen.
- [ ] BUG: Messages that contain URLs or other text without spaces go past their box boundaries and trample the next chat message box.
