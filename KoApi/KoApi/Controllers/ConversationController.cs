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

        private class ConversationReturn
        {
            public string MessageBody { get; set; }
            public string MessageTime { get; set; }
            public Boolean SentByLoggedInUser { get; set; }
        }

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
                .Where(c => c.Recipient == recipient || c.Sender == LoggedInUser || c.Sender == recipient || c.Recipient == LoggedInUser)
                .OrderBy(c => c.MessageTime)
                .ToList();

            // If we have conversations to return, then return them
            if (Conversation is null)
            {
                return NotFound();
            } else
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
                    Thread.Add(new ConversationReturn {
                        MessageBody = msg.MessageBody,
                        MessageTime = msg.MessageTime.ToString(),
                        SentByLoggedInUser = SentBool
                    });
                }

                // Return the conversation thread
                return Ok(Thread);
            }
        }
    }
}
