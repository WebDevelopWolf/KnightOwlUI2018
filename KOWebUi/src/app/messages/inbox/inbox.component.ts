import { Component, OnInit } from '@angular/core';
import { KoapiService } from '../../koapi.service';
import { Http } from "@angular/http";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})

export class InboxComponent implements OnInit {

  conversations: any;
  currentThread: any;
  currentThreadSender: any;
  currentThreadAvatar: any;
  loggedInAvatar: any;
  message: string;
  conversationId: string;
  miniprofile: any;
  profileavatar: any;
  options = [];
  newusermessage: any;
  userSelected: any;
  selectedClass: string;

  constructor(private _koapi: KoapiService) { }

  ngOnInit() {
    this.getUserConversations();
    this.getUserList();
    this.loggedInAvatar = "assets/users/64/" + this._koapi.tempuser.toLowerCase() + ".png";
  }

  // Start new message thread
  sendNewMessage() {
    // Make a new conversation
    class MessageSend {
      MessageFrom: any;
      MessageTo: any;
      Message: any;
      Id: any;
    }
    let messageToSend = new MessageSend();
    messageToSend.MessageTo = this.currentThreadSender;
    messageToSend.MessageFrom = this._koapi.tempuser;
    messageToSend.Message = this.newusermessage;
    this._koapi
    .postService("Conversation/New", messageToSend)
    .then((result) => {
      this.changeSelectedConversation(this.currentThreadSender);
      this.newusermessage = "";
    })
    .catch(error => console.log(error));

    // Close Modal
    document.getElementById("closeModalButton").click();
  }

  // Get users list for new message
  getUserList() {
    // Get users from API
    this._koapi
    .getService("users")
    .then((result) => {
      result.forEach( user => {
        // Add Username to dropdown list
        if (user.Username != this._koapi.tempuser) {
          this.options.push(user.Username);
        }
      });
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Select User From New Message Dropdown
  onSelect(val){
    this.currentThreadSender = val;
  }

  // Get the logged in users conversations
  getUserConversations() {
    this._koapi
    .getService("Conversations/" + this._koapi.tempuser)
    .then((result) => {
      // Add the user's avatar image to the conversation & trim preview string
      result.forEach(con => {
        con.avatar = "assets/users/64/" + con.FromUser.toLowerCase() + ".png";
        con.LastMessageBody = con.LastMessageBody.substring(0, 28) + "...";
        con.Class = "";
      });
      // Push conversations to the UI
      this.conversations = result;
    }).then(() => {
      this.changeSelectedConversation(this.conversations[0].FromUser);
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Change the conversation thread based on selected conversation
  changeSelectedConversation(sender: string) {
    this.currentThreadSender = sender;
    this.currentThreadAvatar = "assets/users/96/" + sender.toLowerCase() + ".png";
    this._koapi
    .getService("Conversation/" + this._koapi.tempuser + "/" + sender)
    .then((result) => {
      // Get the conversation id
      this.conversationId = result[0].ConversationId;
      result.forEach(thread => {
        // Set style based on sender / recipient
        if (thread.SentByLoggedInUser) {
          thread.msgStyle = "message-to";
          thread.userStyle = "user-to";
          thread.msgBodyStyle = "text-to"; 
          // Add the user's avatar image to the conversation thread
          thread.avatar = "assets/users/64/" + this._koapi.tempuser.toLowerCase() + ".png";
        } else {
          thread.msgStyle = "message-from";
          thread.userStyle = "user-from";
          thread.msgBodyStyle = "text-from"; 
          // Add the user's avatar image to the conversation thread
          thread.avatar = "assets/users/64/" + sender.toLowerCase() + ".png";
        }
      });
      // Push Thread to the UI
      this.currentThread = result;      
    }).then(() => {
      // Get the mini-profile
      this.getMiniProfile(this.currentThreadSender);
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }

  // Send new message to conversation
  sendMessage () {
    class MessageSend {
      MessageFrom: any;
      MessageTo: any;
      Message: any;
      Id: any;
    }
    let messageToSend = new MessageSend();
    messageToSend.MessageTo = this.currentThreadSender;
    messageToSend.MessageFrom = this._koapi.tempuser;
    messageToSend.Message = this.message;
    messageToSend.Id = this.conversationId;
    this._koapi
    .postService("Conversation/AddTo", messageToSend)
    .then((result) => {
      this.changeSelectedConversation(this.currentThreadSender);
      this.message = "";
    })
    .catch(error => console.log(error));
  }

  // Load the user profile
  getMiniProfile(usernameLookup: string){
    this._koapi
    .getService("Conversation/Profile/" + usernameLookup)
    .then((result) => {
      // Set the profile avatar
      this.profileavatar = "assets/users/256/" + usernameLookup.toLowerCase() + ".png";
      // Push Profile to the UI
      this.miniprofile = result;
    })
    // Catch any API Errors
    .catch(error => console.log(error));
  }
}
