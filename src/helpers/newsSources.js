import Parser from 'rss-parser';

export const RSSNewsSources = {
	sv : {
		url    : 'https://api.sr.se/api/rss/program/4916',
		source : 'Radio Sweden på lätt svenska'
	}
};

const parser = new Parser();
// const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export async function getRSSFeed(source_code) {
	const url = RSSNewsSources[source_code]['url'];
	// const feed = await parser.parseURL(CORS_PROXY + url);
	const feed = await parser.parseURL(url);

	const randomNum = Math.floor(Math.random() * feed.items.length);
	const article = feed.items[randomNum];

	return {
		author  : article.author,
		link    : article.link,
		pubDate : article.pubDate,
		text    : article.contentSnippet,
		title   : article.title
	};
}
