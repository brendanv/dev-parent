const { DateTime } = require("luxon")
const pluginBundle = require("@11ty/eleventy-plugin-bundle");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginBundle);

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data"
    }
  };
};

