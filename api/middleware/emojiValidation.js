const emojiRegex = require('emoji-regex/text')

function emojiValidation(req, res, next) {
  const emojiString1 = req.body.subEmojis1
  const emojiString2 = req.body.subEmojis2
    
  function isOnlyEmojis(message) {
    if (!message) return true;

    const noEmojis = message.replace(emojiRegex(), "");
    const noSpace = noEmojis.replace(/[\s\n]/gm, "");

    return !noSpace
  }
 
    // slicing off the last item in the string because it will always be a comma, and the function will return false for the emoji string because it takes the comma into account.
    if (
      isOnlyEmojis(emojiString1.slice(0, emojiString1.length - 1)) && isOnlyEmojis(emojiString2))
     {
      next()
    } else {
      res.status(403).json({ message: 'feedback must be a string of no more than 6 emojis'})
    }
}

module.exports = emojiValidation

