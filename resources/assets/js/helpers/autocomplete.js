import algolia from 'algoliasearch'
import autocomplete from 'autocomplete.js'

const index = algolia('G27PRX2QGC', 'c1719623eaadd44daa2ff129fc946366');

export const userautocomplete = selector => {
    const users = index.initIndex('users');

    return autocomplete(selector, {}, {
        source: autocomplete.sources.hits(users, { hitsPerPage: 10 }),
        displayKey: 'name',
        templates: {
            suggestion (suggestion) {
                return `<span>${suggestion.name}</span>`;
            },
            empty: '<div class="aa-empty">No people found.</div>'
        }
    })
};
