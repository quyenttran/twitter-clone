var Tweet = function(args) {
  this.content = args.content
  this.username = args.username
  this.handle = args.handle
  this.avatar_url = args.avatar_url
  this.created_at = args.created_at
  this.updated_at = args.updated_at
  this.hashtag_names = args.hashtag_names
}

var NewTweet = function(content) {
  this.content = content
  this.hashtag_names = content.match(/[#]\w+/g)
}
