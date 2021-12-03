fetch("http://127.0.0.1:5000/sendmessage", {
  "body": JSON.stringify({ "message": "hello" }),
  headers: {
    'Content-Type': 'application/json',
  },
  "method": "POST"
}).then(async res => console.log(await res.text()));