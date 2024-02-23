// ! Shorten text function
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

// ! Validate Email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// ! Calculate the average rating of a product
export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0; // * Return 0 if the ratings array is empty or not an array
  }

  var totalStars = 0;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }

  return totalStars / ratings.length;
}
