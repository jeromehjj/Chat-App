console.log("App is alive");
// Choose the selected channel that is displayed
let selectedChannel = channel1;
let channels = [];
let messages = [];

// Initializing the Chatter App
function init() {
    console.log("App is initialized");
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels();
    // loadEmojis();
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document
        .getElementById("emoticon-button")
        .addEventListener("click", toggleEmojiArea);
    document
        .getElementById("close-emoticon-button")
        .addEventListener("click", toggleEmojiArea);
}

// Function to switch channels upon clicking
function switchChannel(selectedChannelID) {
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.remove("selected");
    }
    document.getElementById(selectedChannelID).classList.add("selected");
    channels.forEach(channel => {
        if (channel.id === selectedChannelID) {
            selectedChannel = channel;
        }
    });
    showHeader();
    showMessages();
}

// Function to correctly show the channel header and icons.
function showHeader() {
    document.getElementById('message-area-header').getElementsByTagName('h1')[0].innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = selectedChannel.favourite ? 'favorite' : 'favorite_border';
}

function showMessages() {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = ""
    selectedChannel.messages.forEach(message => {
        const messageTime = message.createdOn.toLocaleTimeString("de-DE", {
            hour: "numeric",
            minute: "numeric"
        });
        let currentMessageHtmlString;
        if (message.own) {
            currentMessageHtmlString = `<div class="message outgoing-message">
                                            <div class="message-wrapper">
                                                <div class="message-content">
                                                    <p>` + message.text + `</p>
                                                </div>
                                                <i class="material-icons">account_circle</i>
                                            </div>
                                            <span class="timestamp">` + messageTime + `</span>
                                        </div>`;
        } else {
            currentMessageHtmlString = `<div class="message incoming-message">
                                            <div class="message-wrapper">
                                                <i class="material-icons">account_circle</i>
                                                <div class="message-content">
                                                    <h3>` + message.createdBy + `</h3>
                                                    <p>` + message.text + `</p>
                                                </div>
                                            </div>
                                            <span class="timestamp">` + messageTime + `</span>
                                        </div>`;
        }
        chatArea.innerHTML += currentMessageHtmlString;
    })
}

function Messages(username, ownedby, text, channelId) {
    this.createdBy = username;
    this.createdOn = new Date(Date.now());
    this.own = ownedby;
    this.text = text;
    this.channel = channelId;
}

// Function to send message in the message-input bar
function sendMessage() {
    const text = document.getElementById("message-input").value;
    if (!!text) {
      const myUserName = "Jerome";
      const own = true;
      const channelID = selectedChannel.id;
      const message = new Message(myUserName, own, text, channelID);
      console.log("New message: ", message);
      selectedChannel.messages.push(message);
      document.getElementById("message-input").value = "";
      showMessages();
      displayChannels();
    } else {
        return;
    }
  }

function getChannels() {
    channels = mockChannels;
}

function getMessages() {
    messages = mockMessages;
}

function displayChannels() {
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = "";
    regularList.innerHTML = "";
    channels.forEach((channel) => {
        const currentChannelHtmlString = `<li id="` + channel.id + `" onclick="switchChannel(this.id)">
        <i class="material-icons">group</i>
        <span class="channel-name">` + channel.name + `</span>
        <span class="timestamp">` + channel.latestMessage + `</span>
    </li>`
        if (channel.favourite) {
            favoriteList.innerHTML += currentChannelHtmlString;
        } else {
            regularList.innerHTML += currentChannelHtmlString;
        }
    });
}

function loadMessagesIntoChannel() {
    channels.forEach(channel => {
        messages.forEach(message => {
            if (message.channel === channel.id) {
                channel.messages.push(message);
            }
        })
    })
}

