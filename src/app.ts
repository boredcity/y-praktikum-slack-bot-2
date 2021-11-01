import { App } from '@slack/bolt';
if (process.env.DEV_MODE) {
    require('dotenv').config();
}
const { PORT = 3000 } = process.env;

const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

// fix for bolt typings
type SayArguments = {
    channel?: string;
    link_names?: boolean;
    text: string;
};

const MENTION_REGEX = /(\s|^)\<?(@\S+)/g;

app.command('/split-to-messages', async ({ command, ack, say }) => {
    console.log({command})
    await ack();
    const messages: String[] = [];
    const mentions = new Set<String>();
    let currentMessageLines: String[] = [];
    for (const line of command.text.split('\n')) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('@')) {
            // mentions
            trimmedLine
                .match(MENTION_REGEX)
                ?.map((msg) => msg.trim())
                ?.forEach((msg) => mentions.add(msg));
        } else if (trimmedLine == '' && currentMessageLines.some(Boolean)) {
            // if line is empty, send message
            messages.push(currentMessageLines.join('\n'));
            currentMessageLines = [];
        } else {
            currentMessageLines.push(trimmedLine);
        }
    }
    if (currentMessageLines.length > 0) {
        messages.push(currentMessageLines.join('\n'));
    }

    const mentionsString = Array.from(mentions).join(' ');

    for (const message of messages) {
        try {
            const sayArg: SayArguments = {
                channel: command.channel_id,
                text: `${message}\n${mentionsString}`,
                link_names: true
            };
            await say(sayArg);
        } catch (err) {
            console.error('Error occured:', err)
        }
    }
});

app.start(+PORT);
console.log(`⚡️ Yandex Praktikum Slack Bot is running on port ${PORT}!`);
