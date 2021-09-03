import React from 'react';

export default function GoogleAdHorizontal() {
	// componentDidMount () {
	(window.adsbygoogle = window.adsbygoogle || []).push({});
	//   }

	// render () {
	return (
		<div className="ad">
			<ins
				className="adsbygoogle"
				style={{ display: 'block' }}
				data-ad-client="ca-pub-4690493667858228"
				data-ad-slot="5599814729"
				data-ad-format="auto"
				data-full-width-responsive="true"
			/>
		</div>
	);
	//   }
}
