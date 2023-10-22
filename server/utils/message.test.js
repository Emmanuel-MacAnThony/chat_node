let { expect } = require("expect");
let { generateMessage, generateLocationMessage } = require("./message.js");

describe("Generate message", () => {
  it("Should generate correct message object", () => {
    let from = "emma";
    let text = "some random text";
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("Generate location message", () => {
  it("Should generate correct location object", () => {
    let from = "emma";
    let lat = 53;
    let lng = 56;
    let url = `https://www.google.com/maps?q=${lat},${lng}`;
    let message = generateLocationMessage(from, lat, lng);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
