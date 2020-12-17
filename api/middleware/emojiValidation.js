const emojiRegex = require('emoji-regex/text')

function emojiValidation(req, res, next) {
  const emojiString1 = req.body.subEmojis1
  const emojiString2 = req.body.subEmojis2
  //function to check if a string is made up of strictly emojis or not
  function isOnlyEmojis(string) {
    if (!string) return true;
    
    /*
    First empty the input string of any emojis
    "😅🤯😎🥵😴🤢" --> ""
    "😅🤯😎🥵mixed" --> "mixed"
    "😅😎Mixed And Spaced" --> "Mixed And Spaced"
    */
    const noEmojis = string.replace(emojiRegex(), "");

     /*
    Then remove any spaces in the emoji-less string
    "😅🤯😎🥵😴🤢" --> "" --> ""
    "😅🤯😎🥵mixed" --> "mixed" --> "mixed"
    "😅😎Mixed And Spaced" --> "Mixed And Spaced" --> "MixedAndSpaced"
     */
    const noSpace = noEmojis.replace(/[\s\n]/gm, "");

    /*
    At this point, strings of strictly emojis will be reduced to an empty string ""
    Empty strings are falsy
    Use the not (!) operator to return truthy for strictly emoji strings (that are repesented by a variable (noSpace) that is an empty string) and falsy for anything else
    */
    return !noSpace
  }
    /*
    The emoji strings always end in a comma, as to separate strings in the database, so the function will return false
    To fix this slice off the last item in the string before running it through the isOnlyEmojis function
    */
    if (isOnlyEmojis(emojiString1.slice(0, emojiString1.length - 1)) && isOnlyEmojis(emojiString2.slice(0, emojiString2.length - 1)))
     {
      next()
    } else {
      console.log('not working')
      res.status(403).json({ string: 'feedback must be a string of strictly emojis, no other characters allowed'})
    }
}

module.exports = emojiValidation

