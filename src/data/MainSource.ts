import semver from 'semver';
import DocsSource from './DocsSource';

export default new DocsSource({
	id: 'cosmicord.js',
	name: 'cosmicord.js',
	global: 'cosmicord.js',
	docsRepo: 'SudhanPlayz/Cosmicord.js',
	repo: 'SudhanPlayz/Cosmicord.js',
	branchFilter: (branch) => branch === 'master' || /^v1[3-9]$/.test(branch),
	tagFilter: (tag: string) => {
		const parsed = /(?:^@.*\/(?<package>.*)@v?)?(?<version>\d+.\d+.\d+)-?.*/.exec(tag);
		const parsedPackage = /(?<package>.*)@v?-?.*/.exec(tag);

		if (parsed?.groups) {
			const isSubpackage = typeof parsed.groups.package === 'string';
			const pkg = isSubpackage ? parsed.groups.package : parsedPackage?.groups?.package ?? 'cosmicord.js';
			const { version } = parsed.groups;
			if (pkg === 'cosmicord.js') return semver.gte(version, '1.0.0');
		}

		return false;
	},
});
