A wrapper script that:

- launches a dedicated Linux server for Valheim game,
- interprets server events by matching its standard output to expected regular expressions,
- buffers necessary data when forming a message requires multiple server outputs,
- sends a message to a Discord channel when a relevant event is detected.
