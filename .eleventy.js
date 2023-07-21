module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/": "/"
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data"
    }
  };
};

