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
        userName: 'adam3413',
        password: 'Woaibaobao1107',
    },
    {
        userName: 'eve3777',
        password: 'Woaibaobao1107',
    },
    {
        userName: 'adolph8015',
        password: 'Woaibaobao1107',
    },
    {
        userName: 'dave4334',
        password: 'Woaibaobao1107',
    }
];
gulp.task('commit', () => {
    child_process_1.spawnSync('git', ['add', '*.html'], { stdio: 'inherit' });
    child_process_1.spawnSync('git', ['commit', '-m', `"commit-${(new Date()).toLocaleString()}"`], { stdio: 'inherit' });
});
gulp.task('default', () => {
    child_process_1.execSync('powershell.exe unblock-file .\\credman.ps1', { stdio: 'inherit' });
    for (let account of accounts) {
        let credResult = child_process_1.spawnSync('powershell.exe', ['.\\credman.ps1', '-AddCred', '-Target', '"git:https://git.coding.net"', '-User', `"${account.userName}"`, '-Pass', `"${account.password}"`], { stdio: 'ignore', encoding: 'utf8' });
        if (credResult.status != 0) {
            console.log('set cred fail: ', account);
        }
        for (let project of projectNames) {
            let gitUrl = `https://git.coding.net/${account.userName}/${project}.git`;
            let remoteName = `${account.userName}-${project}`;
            child_process_1.spawnSync('git', ['remote', 'add', remoteName, gitUrl], { stdio: 'ignore' });
            let result = child_process_1.spawnSync('git', ['push', remoteName, 'coding-pages'], { stdio: 'ignore', encoding: 'utf8' });
            if (result.status == 0) {
                console.log(`${account.userName}.coding.me/${project}`);
            }
            else {
                console.log(`push fail for ${remoteName}`);
            }
        }
    }
});
