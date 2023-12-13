# StegChat: A Twitch chat overlay

Other overlays didn't _quite_ do what I wanted, so I made one. :)  

This is a chat overlay that:

- supports the usual twitch emotes and
- shows messages from one or more twitch channels
- themes

Currently there are two themes: sideways (default) and vertical.  

![image](docs/images/example.png)

## Usage

### Quickstart

Add this URL as a browser source in OBS, passing in the twitch channels to join in the `channels` query parameter as a comma-delimited list. 

Format: `https://steglasaurous.github.io/stegchat?channels=TWITCH_NAME_HERE`

Examples:

Show chat for a single channel:

`https://steglasaurous.github.io/stegchat?channels=my_twitch_username`

Show chat for 2 channels:

`https://steglasaurous.github.io/stegchat?channels=my_twitch_username,another_twitch_username`

Use the vertical theme:

`https://steglasaurous.github.io/stegchat?channels=my_twitch_username&theme=vertical`

### Config Parameters

All parameters are set via the querystring (after the question mark in the URL). See examples above.

`channels` - Required.  A comma-delimited list of one or more twitch channels to show messages for.

`theme` - Set the theme to use.  Available themes are `sideways` (default) and `vertical`.

`message_ttl` - Set how long messages stay on-screen before disappearing, in milliseconds.  Setting to 0 means messages stay indefinitely.


### Advanced (or building it yourself)

> Note this requires Node 16.x or better.

Start with installing dependencies:

```
npm install
```

To serve the app from the default http://localhost:4200/stegchat :

```
npx ng serve
```

