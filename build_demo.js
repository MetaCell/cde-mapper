/* eslint-env node */

import dotenv from 'dotenv';
import replace from 'replace-in-file';

dotenv.config(); // Load environment variables

const getReplacements = () => {
    // Filter only variables starting with VITE_
    const viteEnvVars = Object.keys(process.env).filter(key => key.startsWith('VITE_'));

    // Create replacement options for each VITE_ variable
    return viteEnvVars.map(key => ({
        from: new RegExp(`import.meta.env.${key}`, 'g'),
        to: JSON.stringify(process.env[key]),
    }));
};

const options = {
    files: 'demo/*.js', // Target all .js files in dist directory
    from: [],
    to: [],
};

// Generate and apply replacements
const replacements = getReplacements();
replacements.forEach(replacement => {
    options.from.push(replacement.from);
    options.to.push(replacement.to);
});

replace(options)
    .then(results => {
        console.log(results.filter(r => r.hasChanged).length, 'files changed.')
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });
