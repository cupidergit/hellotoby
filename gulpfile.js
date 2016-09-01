"use strict";
const gulp = require('gulp');
const child_process_1 = require('child_process');
let projectNames = [
    'apple',
    'pear',
    'apricot',
    'peach',
    'grape',
    'banana',
    'pineapple',
    'plum',
    'watermelon',
    'orange',
    'lemon',
    'mango',
    'strawberry',
    'medlar',
    'mulberry',
    'nectarine',
    'cherry',
    'pomegranate',
    'fig',
    'tangerine',
    'persimmon',
    'walnut',
    'hazelnut',
    'peanut',
    'date',
    'chestnut',
    'coconut',
    'blackberry',
    'papaya',
    'guava',
];
let accounts = [
    {
        userName: 'm13058823413@163.com',
        password: 'Woaibaobao1107',
        codeName: 'adam3413'
    }
];
gulp.task('default', () => {
    child_process_1.execSync('powershell.exe unblock-file .\\credman.ps1', { stdio: 'inherit' });
    for (let account of accounts) {
        child_process_1.execSync(`powershell.exe .\\credman.ps1 -AddCred -Target "git:https://git.coding.net" -User "${account.codeName}" -Pass "${account.password}"`, { stdio: 'inherit' });
        for (let project of projectNames) {
            let gitUrl = `https://git.coding.net/${account.codeName}/${project}.git`;
            let remoteName = `${account.codeName}-${project}`;
            child_process_1.spawnSync('git', ['remote', 'add', remoteName, gitUrl], { stdio: 'ignore' });
            child_process_1.spawn('git', ['push', remoteName, 'coding-pages'], { stdio: 'ignore' }).on('exit', (code, signal) => {
                if (code == 0) {
                    console.log(`${account.codeName}.coding.me/${project}`);
                }
                else {
                    console.log(`push fail for ${remoteName}`);
                }
            });
        }
    }
});
