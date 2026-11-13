// Runs `callback` once `image` is decoded, so it can be revealed without a flash.
// Decode failures still run the callback; the image is shown as-is.
const whenDecoded = (image, callback) => {
  if (typeof image.decode === "function") {
    image.decode().then(callback, callback);
  } else {
    callback();
  }
};

export default whenDecoded;
