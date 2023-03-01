export function isValidEmail(emailStr: string): boolean {
  /* The following pattern is used to check if the entered e-mail address
       fits the user@domain format.  It also is used to separate the username
       from the domain. */
  const emailPat = /^(.+)@(.+)$/;
  /* The following string represents the pattern for matching all special
       characters.  We don't want to allow special characters in the address. 
       These characters include ( ) < > @ , ; : \ " . [ ]    */
  const specialChars = '\\(\\)<>@,;:\\\\\\"\\.\\[\\]';
  /* The following string represents the range of characters allowed in a 
       username or domainname.  It really states which chars aren't allowed. */
  const validChars = '[^\\s' + specialChars + ']';
  /* The following pattern applies if the "user" is a quoted string (in
       which case, there are no rules about which characters are allowed
       and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
       is a legal e-mail address. */
  const quotedUser = '("[^"]*")';
  /* The following pattern applies for domains that are IP addresses,
       rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
       e-mail address. NOTE: The square brackets are required. */
  const ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
  /* The following string represents an atom (basically a series of
       non-special characters.) */
  const atom = validChars + '+';
  /* The following string represents one word in the typical username.
       For example, in john.doe@somewhere.com, john and doe are words.
       Basically, a word is either an atom or quoted string. */
  const word = '(' + atom + '|' + quotedUser + ')';
  // The following pattern describes the structure of the user
  const userPat = new RegExp('^' + word + '(\\.' + word + ')*$');
  /* The following pattern describes the structure of a normal symbolic
       domain, as opposed to ipDomainPat, shown above. */
  const domainPat = new RegExp('^' + atom + '(\\.' + atom + ')*$');

  /* The following pattern describes the validity of the domain Eg. should not include
    special character in the email domain. https://wiki.mozilla.org/TLD_List */
  const newRegexToCheckDomain = /^.+@([a-zA-Z0-9][-a-zA-Z0-9]*(\.[-a-zA-Z0-9]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|dev|[a-zA-Z][a-zA-Z]))?$/;

  /* Finally, let's start trying to figure out if the supplied address is
       valid. */

  const emailStrLowerCase = emailStr.toLowerCase();

  /* Begin with the coarse pattern to simply break up user@domain into
       different pieces that are easy to analyze. */
  const matchArray = emailStrLowerCase.match(emailPat);
  if (matchArray === null) {
    /* Too many/few @'s or something; basically, this address doesn't
         even fit the general mould of a valid e-mail address. */
    //alert("Email Address is incorrect.")// (check @ and .'s)
    return false;
  }
  const user = matchArray[1];
  const domain = matchArray[2];

  // See if "user" is valid
  if (user.match(userPat) === null) {
    // user is not valid
    //    alert("The username is not valid.")
    return false;
  }

  /* if the e-mail address is at an IP address (as opposed to a symbolic
       host name) make sure the IP address is valid. */
  const IPArray = domain.match(ipDomainPat);
  if (IPArray !== null) {
    // this is an IP address
    for (let i = 1; i <= 4; i++) {
      if (parseInt(IPArray[i]) > 255) {
        //	        alert("Destination IP address is invalid!")
        return false;
      }
    }
    return true;
  }

  // Domain is symbolic name
  const domainArray = domain.match(domainPat);
  if (domainArray == null) {
    //	alert("The Domain is not valid.")
    return false;
  }

  const regexMatch = emailStrLowerCase.match(newRegexToCheckDomain);
  if (regexMatch == null) {
    return false;
  }

  /* domain name seems valid, but now make sure that it ends in a
       three-letter word (like com, edu, gov) or a two-letter word,
       representing country (uk, nl,in), and that there's a hostname preceding 
       the domain or country. */

  /* Now we need to break up the domain to get a count of how many atoms
       it consists of. */
  const atomPat = new RegExp(atom, 'g');
  const domArr = domain.match(atomPat);

  /* This is unexpected */
  if (domArr === null) {
    return false;
  }

  const len = domArr.length;
  if (domArr[domArr.length - 1].length < 2 || domArr[domArr.length - 1].length > 4) {
    // the address must end in a two letter or three letter word.
    //INC700015869365 modified the validation to accept 2-4 characters instead of 2-3 KPT
    //   alert("The Email Address must end in a three-letter domain, or two letter country.")
    return false;
  }

  // Make sure there's a host name preceding the domain.
  if (len < 2) {
    //   const errStr="This Email Address is missing a hostname!"
    //   alert(errStr)
    return false;
  }

  // If we've gotten this far, everything's valid!
  return true;
}
