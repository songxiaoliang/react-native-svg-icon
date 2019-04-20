

const path = require('path');
const { readFile, readdir, writeFile } = require('fs');

const SVG_FILE_DIR_PATH = './svgFiles'; // 当前目录下存放svg文件的文件夹
const GENERATE_SVG_FILE_NAME = './svgXmlData.js'; // 要生成的svg文件名
const svgFileDir = path.resolve(__dirname, SVG_FILE_DIR_PATH);

/**
 * 读取svg文件
 * @param {*} svgFileName svg文件, 例如 home-icon.svg
 * @returns { 'home-icon': '<svg>... <path>...</path> ...</svg>' }
 */
function readSvgFile(svgFileName) {
    return new Promise((resolve, inject) => {
        readFile(path.join(svgFileDir, svgFileName), 'utf8', (error, svgFile) => {
            // eslint-disable-next-line no-useless-escape
            const svgPath = svgFile.replace(/<\?xml.*?\?>|<\!--.*?-->|<!DOCTYPE.*?>/g, '');
            if (error) {
                inject(error);
            }
            resolve({
                [svgFileName.slice(0, svgFileName.lastIndexOf('.'))]: svgPath,
            });
        });
    });
}

/**
 * 读取svg文件夹目录所有svg文件
 * @returns { 'home-icon': '<path>...</path>', 'xxx': '<path>...</path>' ... }
 */
function readSvgDir() {
    return new Promise((resolve, inject) => {
        readdir(svgFileDir, (error, svgFiles) => {
            if (error) {
                inject(error);
            }
            // svgFiles: string[]
            Promise.all(svgFiles.map((svgFileName) => readSvgFile(svgFileName)))
                .then((data) => resolve(data))
                .catch((err) => inject(err));
        });
    });
}

/**
 * 生成 .js 文件
 */
readSvgDir().then((data) => {
    const svgFile = `export default {
        ${
    data.map((item, index) => `${Object.keys(item)[0]}: '${Object.values(item)[0]}'\n`)
}
    }`;
    writeFile(path.resolve(__dirname, `./${GENERATE_SVG_FILE_NAME}`), svgFile, (err) => {
        if (err) {
            throw new Error(err);
        }
    });
}).catch((error) => {
    throw new Error(error);
});
