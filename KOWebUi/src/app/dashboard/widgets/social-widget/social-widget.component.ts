import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-widget',
  templateUrl: './social-widget.component.html',
  styleUrls: ['./social-widget.component.css']
})
export class SocialWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var config = {
      "id": '605465000484982784',
      "domId": '',
      "maxTweets": 3,
      "enableLinks": true,
      "showUser": false,
      "showTime": true,
      "dateFunction": '',
      "showRetweet": false,
      "customCallback": handleTweets,
      "showInteraction": false
    };
    
    function handleTweets(tweets) {
        var x = tweets.length;
        var n = 0;
        var element = document.getElementById('social');
        var html = '';
        while(n < x) {
          html += '<div class="tweet-outer"><div class="tweet-inner">' + tweets[n] + '</div></div>';
          n++;
        }
        element.innerHTML = html;
    }
    
    //twitterFetcher.fetch(config);
  }


}
