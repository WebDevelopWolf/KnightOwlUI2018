using KoApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KoApi.Controllers
{
    public class ConversationController : ApiController
    {
        KoContext KoData = new KoContext();

        #region Classes
        private class ConversationReturn
        {
            public string MessageBody { get; set; }
            public string MessageTime { get; set; }
            public Boolean SentByLoggedInUser { get; set; }
            public string ConversationId { get; internal set; }
        }

        public class SentMessage
        {
            public string MessageFrom { get; set; }
            public string MessageTo { get; set; }
            public string Message { get; set; }
            public string Id { get; set; }
        }
        #endregion

        #region PostConversation

        // Post a new conversation
        [Route("Conversation/New")]
        [HttpPost]
        public IHttpActionResult NewConversation([FromBody] SentMessage conversation)
        {
            if (conversation is null)
            {
                return NotFound();
            }

            // Get User
            var UserCont = new UserController();
            var To = new User();
            var From = new User();
            To = UserCont.GetUserByUsername(conversation.MessageTo);
            From = UserCont.GetUserByUsername(conversation.MessageFrom);

            // Check user has been found
            if (To is null || From is null)
            {
                return NotFound();
            }

            // Generate Conversation & Add to database
            var NewConversation = new Conversation();
            NewConversation.ConversationId = Guid.NewGuid();
            NewConversation.FromUser = To.UserId;
            NewConversation.ToUser = From.UserId;
            NewConversation.LastMessage = 0;

            // Generate Message & add to database
            var NewMessage = new ConversationMessage();
            NewMessage.ConversationId = NewConversation.ConversationId;
            NewMessage.ConversationMessageId = Guid.NewGuid();
            NewMessage.MessageBody = conversation.Message;
            NewMessage.MessageDateTime = DateTime.Now;
            NewMessage.MessageSender = From.UserId;
            NewMessage.MessageRecipient = To.UserId;

            // Add to database
            KoData.Conversations.Add(NewConversation);
            KoData.ConversationMessages.Add(NewMessage);
            KoData.SaveChanges();

            // Return success message
            return Ok("Conversation Sent");
        }

        // Post a new message
        [Route("Conversation/AddTo")]
        [HttpPost]
        public IHttpActionResult AddToConversation([FromBody] SentMessage message)
        {
            if (message is null)
            {
                return NotFound();
            }

            // Get User
            var UserCont = new UserController();
            var To = new User();
            var From = new User();
            To = UserCont.GetUserByUsername(message.MessageTo);
            From = UserCont.GetUserByUsername(message.MessageFrom);

            // Check user has been found
            if (To is null || From is null)
            {
                return NotFound();
            }

            // Generate New Message
            var NewMessage = new ConversationMessage();
            NewMessage.ConversationId = new Guid(message.Id);
            NewMessage.ConversationMessageId = Guid.NewGuid();
            NewMessage.MessageBody = message.Message;
            NewMessage.MessageDateTime = DateTime.Now;
            NewMessage.MessageSender = From.UserId;
            NewMessage.MessageRecipient = To.UserId;

            // Add to Database
            KoData.ConversationMessages.Add(NewMessage);
            KoData.SaveChanges();

            return Ok("Message Sent");
        }
        #endregion

        #region GetConversation
        // Get User Conversations
        [Route("Conversations/{username}")]
        [HttpGet]
        public IHttpActionResult GetUsersConversations(string username)
        {
            // Protect against empty username
            if (username is null || username == "")
            {
                return NotFound();
            }

            // Get all conversations logged in user sent or received
            List<GetUserConversation> UserConversations =
                KoData.GetUserConversations
                .Where(c => c.FromUser == username || c.ToUser == username)
                .ToList();

            // If we have conversations to return, then return them
            if (UserConversations is null)
            {
                return NotFound();
            }
            else
            {
                return Ok(UserConversations);
            }
        }

        // Get Conversation
        [Route("Conversation/{LoggedInUser}/{recipient}")]
        [HttpGet]
        public IHttpActionResult GetConversation(string LoggedInUser, string recipient)
        {
            // Protect against empty username
            if (LoggedInUser is null || LoggedInUser == "" || recipient is null || recipient == "")
            {
                return NotFound();
            }

            // Get all conversations logged in user sent or received
            List<GetConversation> Conversation =
                KoData.GetConversations
                .Where(c => (c.Recipient == recipient && c.Sender == LoggedInUser) || (c.Sender == recipient && c.Recipient == LoggedInUser))
                .OrderBy(c => c.MessageTime)
                .ToList();

            // If we have conversations to return, then return them
            if (Conversation is null)
            {
                return NotFound();
            }
            else
            {
                // Sort out who sent the message to who
                var Thread = new List<ConversationReturn>();
                Boolean SentBool = true;
                foreach (var msg in Conversation)
                {
                    if (msg.Recipient == LoggedInUser)
                    {
                        SentBool = false;
                    }
                    else if (msg.Sender == LoggedInUser)
                    {
                        SentBool = true;
                    }
                    Thread.Add(new ConversationReturn
                    {
                        MessageBody = msg.MessageBody,
                        MessageTime = msg.MessageTime.ToString(),
                        SentByLoggedInUser = SentBool,
                        ConversationId = msg.ConversationId.ToString()
                    });
                }

                // Return the conversation thread
                return Ok(Thread);
            }
        }
        #endregion

        #region GetAdditional
        // Get User Mini-Profile
        [Route("Conversation/Profile/{username}")]
        [HttpGet]
        public IHttpActionResult GetUserProfile(string username)
        {
            // Protect against empty username
            if (username is null || username == "")
            {
                return NotFound();
            }

            // Get User Profile
            User MiniProfile = KoData.Users.FirstOrDefault(u => u.Username == username);

            // If we found a profile, then return it
            if (MiniProfile is null)
            {
                return NotFound();
            }
            else
            {
                return Ok(MiniProfile);
            }
        }
        #endregion

    }
}
