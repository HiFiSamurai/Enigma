Simple cryptography tool for the encoding and decoding of string arguments.

During encryption, each character is converter to a different ASCII value, based on the included keymap (which can be randomly generated via the included map generator script). The character assignment is shifted after each character, based on factor which incorporates the current date (as an integer value), and the sum of a series of floating point value 'gears'.

The gears are chosen arbitrarily, but should be selected to ensure the longest period of iterations before they circle around to the same map. This period will be determined by the lowest common multiple of the gear values and the length of the character map (95).

Note: There is issues with attempting to decode values via the command line, as characters will periodically be encoded as invalid bash characters (' " ! $). Also, messages will only valid for the day they were created, due to the date based salt added to each character encoding. I don't consider this a serious cryptographic project, just more of a thought exercise that I started working on after reading some details about the WWII era Enigma cypher.
