# Spotify FriendLikes

A [Spicetify](https://spicetify.app/) extension for sending likes to your friends on Spotify for their listening activity.

## Installation

First, [install Spicetify](https://spicetify.app/docs/getting-started)

Next, copy `extension/friendlikes.js` ([link](https://github.com/aloverso/spotify-friendlikes/blob/main/extension/friendlikes.js)) into your [Spicetify](https://github.com/khanhas/spicetify-cli) extensions directory:

| **Platform** | **Path** |
|------------|-----------------------------------------------------------------------------------|
| **Linux** | `~/.config/spicetify/Extensions` or `$XDG_CONFIG_HOME/.config/spicetify/Extensions/` |
| **MacOS** | `~/.config/spicetify/Extensions` or `$SPICETIFY_CONFIG/Extensions` |
| **Windows** | `%userprofile%\.spicetify\Extensions\` |

After putting the extension file into the correct folder, run the following command to install the extension:

```
spicetify config extensions friendlikes.js
spicetify apply
```

## Usage

This extension impacts your Friend Activity feed, which is a desktop-only feature. Click the heart icon next to a friend's active song. This will send them a like. If they have the extension installed also, they will receive a notification in the feed that you've liked their song. You can close like notifications using the `X` button.

Both the sender and the recipient of the Like need to have the extension installed in order to benefit. 
