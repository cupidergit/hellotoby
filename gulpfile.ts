import * as gulp from 'gulp';
import {execSync, spawn, spawnSync} from 'child_process';


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

let accounts: Array<account> = [
    {
        userName: 'adam3413',
        password: 'Woaibaobao1107',
    }
];


gulp.task('commit', () => {
    spawnSync('git', ['add', '*.html'], { stdio: 'inherit' });
    spawnSync('git', ['commit', '-m', `"commit-${(new Date()).toLocaleString()}"`], { stdio: 'inherit' });
});

gulp.task('default', () => {
    execSync('powershell.exe unblock-file .\\credman.ps1', { stdio: 'inherit' });

    for (let account of accounts) {
        execSync(`powershell.exe .\\credman.ps1 -AddCred -Target "git:https://git.coding.net" -User "${account.userName}" -Pass "${account.password}"`, { stdio: 'inherit' });
        for (let project of projectNames) {
            let gitUrl = `https://git.coding.net/${account.userName}/${project}.git`;
            let remoteName = `${account.userName}-${project}`;
            spawnSync('git', ['remote', 'add', remoteName, gitUrl], { stdio: 'ignore' });
            spawn('git', ['push', remoteName, 'coding-pages'], { stdio: 'ignore' }).on('exit', (code, signal) => {
                if (code == 0) {
                    console.log(`${account.userName}.coding.me/${project}`)
                } else {
                    console.log(`push fail for ${remoteName}`);
                }
            });
        }
    }
});