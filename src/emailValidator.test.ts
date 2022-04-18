import { isValidEmail } from './emailValidator';

describe('emailValidator', () => {
    let scEmailValidator;
  let alphanumericStringValidator;
  let contactNumStringValidator;
  let numericStringValidator;

  test('To test validator to return true when provided a valid email addresses', (done) => {
    let validEmail = [
      'Pepe@gmail.com',
      'Penguin@gmail2.com',
      'JiaBabuey@12mail.com',
      'Jia_Babuey@12mail.com',
      'Jia.Babuey@12mail.com',
      'Jia-Babuey@12mail.com',
      'Jia-Babuey@12mail.com.sg',
      'Jia-Babuey@12-mail.com.sg',
      '"Fred Bloggs"@iana.org',
      'Jia-Babuey@12mail.co',
      'test@[123.123.123.123]',
      'first.last@123.iana.org',
      'test@xn--example.com',
      'test@xn--example.COM',
      'test@isce2.astar.edu.sg',
      'test@example.example.iana.org',
      '1234567890123456789012345678901234567890123456789012345678901234@iana.org'
    ];

    expect.assertions(validEmail.length);
    for (let index in validEmail) {
      let testResult = isValidEmail(validEmail[index]);
      expect(testResult).toBe(true);
      done();
    }
  });

  test('To test validator to return false when provided a invalid email addresses', (done) => {
    let validEmail = [
    'apple@go_gmail.com',
    'apple',
    'Pepe@gmail.o',
    'Penguingmail2.com',
    'google.com.sg',
    'testing@gmail_.com',
    'testing@gmail$.com',
    'testing12345@gm@ail.com',
    'testing12345@gmail.com.123',
    '"first"last"@iana.org',
    'test@123.123.123.123]',
    'a@[256.123.123.123]',
    'gatsby@f.sc.ot.t.f.i.tzg.era.l.d.',
    'first.last@sub.do,com',
    'Jia.Babuey@gmail.aaaaaaaaa',
    ];

    expect.assertions(validEmail.length);
    for (var index in validEmail) {
        let testResult = isValidEmail(validEmail[index]);
      expect(testResult).toBe(false);
      done();
    }
  });
});
