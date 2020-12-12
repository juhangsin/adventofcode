const fs = require('fs');
const inputs = fs.readFileSync('./input.txt', 'utf-8').split('\n\n')

const reqFields = [ "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"/*, "cid"*/];
let valid = 0;

const passports = inputs.map(items => {
  const fields = items.split(/\s/);
  let passportsFields = []
  for (const item of fields) {
    const key = item.split(':')[0]
    const value = item.split(':')[1]
    const field = [key, value]
    passportsFields.push(field)
  }
    return Object.fromEntries(passportsFields)
})

for (const passport of passports) {
  if (
    passport.byr >= 1920 && passport.byr <= 2002 &&
    passport.iyr >= 2010 && passport.iyr <=2020 &&
    passport.eyr >= 2020 && passport.eyr <=2030 &&
    validHeight(passport.hgt) &&
    validEyeColor(passport.hcl) &&
    /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl) &&
    /^(\d{9})$/.test(passport.pid)
  ) {
    valid++;
  }
}

function validHeight(height) {
  const rules = /^(\d{2,3})(cm|in)$/;
  if (rules.test(height)) {
    const check = height.match(/^(\d{2,3})(cm|in)$/)
    if (!check) return;
    if (check[2] === 'cm') {
      return check[1] >= 150 && check[1] <= 193
    }
    if (check[2] === 'in') {
      return check[1] >= 59 && check[1] <= 76
    }
  };
}

function validEyeColor(eyeColor) {
  const rules = /^(#)[0-9a-f]{6}$/;
  return rules.test(eyeColor)
}

console.log(valid)

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.


