var Tweet = function(args) {
  this.content = args.content
  this.username = args.username
  this.handle = args.handle
  this.avatar_url = args.avatar_url
  this.created_at = args.created_at
  this.updated_at = args.updated_at
  this.hashtag_names = this.getHashtags(this.content)
}

Tweet.prototype.getHashtags = function(content) {
  var matches = content.match(/\B#\w*[a-zA-Z]+\w*/g)
  var newMatches = []
  matches.forEach(function(tag) {
    newMatches.push(tag.substring(1));
  })
  return newMatches
}
