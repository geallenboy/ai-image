import React from "react";

const EmailTemplate = ({
  userName,
  message,
}: {
  userName: string;
  message: string;
}) => {
  return (
    <div>
      <h1>hi: {userName}!</h1>
      <h1>message: {message}!</h1>
    </div>
  );
};

export default EmailTemplate;
