const CleanCSS = require("clean-css");
const { DateTime } = require("luxon")
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginTimeToRead = require('eleventy-plugin-time-to-read');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "public/img/favicon": "/"
  });

  eleventyConfig.addPlugin(pluginBundle, {
    transforms: [
      async function(content) {
        if (this.type === "css") {
          return new CleanCSS({}).minify(content).styles;
        }
        return content;
      }
    ]
  });
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginTimeToRead);

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data"
    }
  };
};

