import './App.css';
import React, { Component } from 'react';
import axios from "axios";
import './styles.css'; // Import the CSS file
import iconImage from './assets/My project.png'
class Chatbot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // Add initial message from bot to messages list
    this.setState({
      messages: [...this.state.messages, {
        sender: "bot",
        message: "Welcome to KIYO Bot! I recommend Anime based on your queries. Here are a few things you can ask me:"
      }, {
        //Replace message with 3 star trek questions
        sender: "bot",
        message: "->  Suggest an anime about war?"
      }, {
        sender: "bot",
        message: "->  suggest anime like Fate/Zero?"
      }
      ]
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userMessage = event.target.elements.userInput.value
    //Set messages state
    this.setState({ messages: [...this.state.messages, { type: 'user', message: userMessage }] });
    event.target.elements.userInput.value = ''
    this.sendMessage(userMessage)
  }

  sendMessage = async (userMessage) => {
    const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';
    const openaiApiKey = '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';
    const model = 'gpt-3.5-turbo';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    };

    const data = {
      'model': model,
      'messages': [{ "role": "user", "content": userMessage }]
    };

    axios.post(openaiEndpoint, data, { headers })
      .then(response => {
        const chatResponse = response.data.choices[0].message.content;
        this.setState({
          messages: [...this.state.messages, {
            sender: "bot",
            message: chatResponse
          }]
        });
        console.log(chatResponse);
        // Do something with the chat response
      })
      .catch(error => {
        console.error(error);
        // Handle the error
      });
  };


  render() {
    return (
      <div className="chatbot">
        <img className='icon' src={iconImage} alt="Icon" />
        <div className="chat-window">
          {this.state.messages.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              {message.message}
            </div>
          ))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="userInput" placeholder="Type your message here" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }

}

export default Chatbot;
