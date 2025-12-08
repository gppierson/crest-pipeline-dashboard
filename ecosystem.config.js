module.exports = {
    apps: [
        {
            name: 'crest-dashboard',
            script: 'node_modules/next/dist/bin/next',
            args: 'start -p 3000',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                DATABASE_URL: 'file:./dev.db'
            },
        },
    ],
};
