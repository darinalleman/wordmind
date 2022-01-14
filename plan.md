Wordmind is a game similar to Wordle, but instead of one word per day, you can play as many rounds as you'd like.

You get 6 chances to guess the word.

Need API endpoints for the following action

* start game (assign word, return to front end encrypted (no cheating))
* submit guess along with encrypted word    
  * is guess a word?
    - compare guess with unencrypted word
    - return a number that represents each letter
      - 1 is wrong letter, 2 is right letter wrong place, 3 is right letter right place
      - grey, yellow, green
    - 