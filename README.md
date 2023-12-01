# StegChat: A Twitch chat overlay

Other overlays didn't _quite_ do what I wanted, so I made one. :)  

This is a chat overlay that:

- supports the usual twitch emotes and
- shows messages from one or more twitch channels

There's only one theme at the moment - showing messages in a horizontal fashion.  More layouts and themes to come.

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

### Advanced (or building it yourself)

> Note this requires Node 16.x or better.

Start with installing dependencies:

```
npm install
```

To serve the app from the default http://localhost:4200 :

```
npx ng serve
```

