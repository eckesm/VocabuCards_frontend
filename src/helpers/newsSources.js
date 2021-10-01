import { customAxios } from './tokens';
// import Parser from 'rss-parser';

import { API_URL } from './API';
import { getAccessToken } from './API';

// export const RSSNewsSources = {
// 	fr : {
// 		url    : 'https://www.france24.com/fr/rss',
// 		source : 'France 24'
// 	},
// 	sv : {
// 		url    : 'https://api.sr.se/api/rss/program/4916',
// 		source : 'Radio Sweden på lätt svenska'
// 	}
// };

// export async function getRSSFeed(source_code) {
// 	const parser = new Parser();
// 	const url = RSSNewsSources[source_code]['url'];
// 	const feed = await parser.parseURL(url, { mode: 'no-cors' });

// 	const randomNum = Math.floor(Math.random() * feed.items.length);
// 	const article = feed.items[randomNum];

// 	return {
// 		author  : article.author,
// 		link    : article.link,
// 		pubDate : article.pubDate,
// 		text    : article.contentSnippet,
// 		title   : article.title
// 	};
// }

export async function getArticleFromServer(source_code) {
	try {
		const headers = {
			Authorization : 'Bearer ' + getAccessToken()
		};
		const res = await customAxios.get(`${API_URL}/articles/new/${source_code}`, { headers: headers });

		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function getSavedArticleFromServer(source_code) {
	try {
		const headers = {
			Authorization : 'Bearer ' + getAccessToken()
		};
		const res = await customAxios.get(`${API_URL}/articles/saved/random/${source_code}`, { headers: headers });

		return res.data;
	} catch (e) {
		console.log(e);
	}
}
