const emojiRegex = require('emoji-regex/text')

function emojiValidation(req, res, next) {
    function isOnlyEmojis(message) {
      if (!message) return true;
    
      const noEmojis = message.replace(emojiRegex(), "");
      console.log("1. noEmojis", noEmojis);
      const noSpace = noEmojis.replace(/[\s\n]/gm, "");
      console.log("nospace", noSpace);
    
      return !noSpace;
    }
  
    const emojiString1 = req.body.subEmoji1
    const emojiString2 = req.body.subEmoji2
    if ((isOnlyEmojis(emojiString1) && isOnlyEmojis(emojiString2)) && (emojiString1.length <= 6 && emojiString2.length <= 6)) {
      next()
    } else {
      console.log('hol up')
      res.status(403).json({ message: 'feedback must be a string of no more than 6 emojis'})
    }
}

module.exports = emojiValidation

