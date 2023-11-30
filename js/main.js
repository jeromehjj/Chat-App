console.log("App is alive");
// Choose the selected channel that is displayed
let selectedChannel = channel1;

// Function to switch channels upon clicking
function switchChannel(channel) {
    console.log(channel.name);
    document.getElementById(selectedChannel.id).classList.remove("selected");
    document.getElementById(channel.id).classList.add("selected");
    selectedChannel = channel;
    showHeader();
}

// Function to correctly show the channel header and icons.
function showHeader() {
    document.getElementById('channelName').innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = selectedChannel.favourite ? 'favorite' : 'favorite_border';
}

// Function to send message in the message-input bar
function sendMessage() {
    let messageText = document.getElementById('message-input').value;
    console.log(messageText);
    let messageString = `<div class="message outgoing-message">
                            <div class="message-wrapper">
                                <div class="message-content">
                                    <p>` + messageText + `</p>
                                </div>
                                <i class="material-icons">account_circle</i>
                            </div>
                            <span class="timestamp">11:45</span>
                        </div>`
    document.getElementById('chat-area').innerHTML = messageString;
    document.getElementById('message-input').value = '';
}

