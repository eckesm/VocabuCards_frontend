import Parser from 'rss-parser';

export const RSSNewsSources = {
	sv : {
		url    : 'https://api.sr.se/api/rss/program/4916',
		source : 'Radio Sweden på lätt svenska'
	}
};

export async function getRSSFeed(source_code) {
	const parser = new Parser();

	const url = RSSNewsSources[source_code]['url'];
	const feed = await parser.parseURL(url);

	const randomNum = Math.floor(Math.random() * feed.items.length);
	const article = feed.items[randomNum];
	// console.log(article);
	// const source = RSSNewsSources[source_code]['source'];

	return {
		author  : article.author,
		link    : article.link,
		pubDate : article.pubDate,
		text    : article.contentSnippet,
		title   : article.title
	};
}
