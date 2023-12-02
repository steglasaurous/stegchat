import * as fs from 'fs';
const distDir = process.argv[2];
if (!fs.existsSync(distDir)) {
  console.warn('distDir does not exist.  Pass the directory to act on as the first argument. Ex: node postbuild.mjs dist/universal-song-overlay');
  process.exit(-1);
}

const htmlFileData = fs.readFileSync(`${distDir}/index.html`).toString();
// let matches = htmlFileData.matchAll(/<script src="(?<scriptfile>[A-Za-z0-9.\-]*)" type="module"><\/script>/g);
const replacement = htmlFileData.replace(
  /<script src="(?<scriptfile>[A-Za-z0-9.\-]*)" type="module"><\/script>/g,
  (match, p1, offset, input, namedGroups) => {

    let scriptContents = fs.readFileSync(`${distDir}/${namedGroups['scriptfile']}`).toString();
    console.log('Replaced ' + namedGroups['scriptfile']);
    return '<script type="module">' + "\n" + scriptContents + "\n" + '</script>';
  });

fs.writeFileSync(`${distDir}/index.html`, replacement);
