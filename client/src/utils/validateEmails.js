const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  const invalidEmails = emails
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email.length > 0 && regEx.test(email) === false);

  if (invalidEmails.length) {
    return `Please check these emails:  ${invalidEmails}`;
  }
};
